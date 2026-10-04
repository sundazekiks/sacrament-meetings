"use server"
import * as z from 'zod'
import { errNormalize } from './errorNormalizer';
import { AppError } from '@/components/AppError';
import { addMeeting } from './meetings-db';
import { announcementUtil, hymnUtil, speakerUtil, wardBusinessUtil } from './helper';
import { redirect, RedirectType } from 'next/navigation';
import { updateMeeting } from './meetings-db';
import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { deleteMeeting } from './meetings-db';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

const HymnSchema = z.strictObject({
    number: z.number(),
    title: z.string(),
});
const SpeakerSchema = z.array(z.strictObject({
    name: z.string(),
    topic: z.string(),
    type: z.enum(['speaker', 'musical-number'])
}))

export type Speaker = z.infer<typeof SpeakerSchema>

// Meeting schema for validation / cleaning a record
const MeetingFormSchema = z.object({
    date: z.string(),            // ISO date string: 'YYYY-MM-DD'
    meetingType: z.enum(['testimony', 'regular', 'stake', 'general']),
    presiding: z.string(),
    conducting: z.string(),
    announcements: z.array(z.string()).optional().default([]),
    openingHymn: HymnSchema,
    openingPrayer: z.string(),
    wardBusiness: z.array(z.strictObject({
        description: z.string()
    })),
    stakeBusiness: z.boolean(),
    sacramentHymn: HymnSchema,
    speakers: SpeakerSchema,
    closingHymn: HymnSchema,
    closingPrayer: z.string()
})

export const createMeeting = async (formData: FormData) => {
    try {
        // TODO: fix complexity, make it modular
        const raw = {
            id: Number(formData.get('id')),
            date: formData.get('date'),
            meetingType: formData.get('meetingType'),
            presiding: formData.get('presiding'),
            conducting: formData.get('conducting'),
            announcements: announcementUtil(formData.get('announcements') as string),
            openingHymn: hymnUtil(formData, "openingHymn"),
            openingPrayer: formData.get('openingPrayer'),
            wardBusiness: wardBusinessUtil(formData.get('wardBusiness') as string),
            stakeBusiness: formData.get('stakeBusiness') === 'true',
            sacramentHymn: hymnUtil(formData, "sacramentHymn"),
            speakers: speakerUtil(formData),
            closingHymn: hymnUtil(formData, "closingHymn"),
            closingPrayer: formData.get('closingPrayer'),
        }
        const results = MeetingFormSchema.safeParse(raw);
        if (!results.success) throw new AppError(results.error.message, 400, 400);
        // create the meeting with the sanitize / validated data
        await addMeeting(results.data)
    } catch (err) {
        const appErr = errNormalize(err as Error);
        console.error(appErr.message)
    }
}

export const updatingMeeting = async (formData: FormData) => {
    try {
        // TODO: fix complexity, make it modular
        const raw = {
            id: Number(formData.get('id')),
            date: formData.get('date'),
            meetingType: formData.get('meetingType'),
            presiding: formData.get('presiding'),
            conducting: formData.get('conducting'),
            announcements: announcementUtil(formData.get('announcements') as string),
            openingHymn: hymnUtil(formData, "openingHymn"),
            openingPrayer: formData.get('openingPrayer'),
            wardBusiness: wardBusinessUtil(formData.get('wardBusiness') as string),
            stakeBusiness: formData.get('stakeBusiness') === 'true',
            sacramentHymn: hymnUtil(formData, "sacramentHymn"),
            speakers: speakerUtil(formData),
            closingHymn: hymnUtil(formData, "closingHymn"),
            closingPrayer: formData.get('closingPrayer'),
        }
        console.log(raw.speakers)
        const results = MeetingFormSchema.safeParse(raw);
        if (!results.success) throw new AppError(results.error.message, 400, 400);
        console.log(results)
        // create the meeting with the sanitize / validated data
        const update = await updateMeeting(raw.id, results.data)

        console.log(update)
        revalidatePath(`/meetings/${update.id}/edit`)
        redirect(`/meetings/${update.id}`, RedirectType.push)
    } catch (err) {
        console.error('RAW ERROR:', err);
        if (isRedirectError(err)) throw err;
        const appErr = errNormalize(err as Error);
        console.error(appErr.message);
    }

}

export const deletingMeeting = async (id: number) => {
    try {
        await deleteMeeting(id);
        console.log("Meeting deleted")
        redirect("/meetings")
    } catch (err) {
        const appError = errNormalize(err as Error)
        console.log(appError.message);
        redirect("/meetings")
    }
}

export const signInUser = async (formData: FormData) => {
    console.log("Signing in user..." + formData.get("username"))
    try {
        await signIn("credentials", {
            username: formData.get("username") as string,
            password: formData.get("password") as string,
            redirectTo: "/"
        })
    } catch (err) {
        if (err instanceof AuthError) {
            console.error("Authentication error:", err.message);
            return { success: false, message: err.message };
        }
        return { success: false, message: "An unexpected error occurred." };
    }

}

export const signOutUser = async () => {
    console.log("Signing out user...")
    await signOut()
}