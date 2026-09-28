import { SacramentMeeting } from "@/lib/types";


export default function MeetingForm({ sacramentMeeting, onSave }: { sacramentMeeting: SacramentMeeting, onSave: (formData: FormData) => Promise<void> }) {
    return (<form className="mx-auto max-w-2xl space-y-8 p-6 sm:p-10" action={onSave}>
        <input type="text" name="id" id="id" defaultValue={sacramentMeeting.id} readOnly className="hidden" />
        <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-slate-900">Meeting Program</h1>
            <p className="text-sm text-slate-500">Edit in the details for this week&apos;s meeting.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
                <label htmlFor="date" className="text-sm font-medium text-slate-700">Date</label>
                <input type="date" name="date" id="date" required defaultValue={sacramentMeeting.date}
                    className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200" />
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="meetingType" className="text-sm font-medium text-slate-700">Meeting Type</label>
                <select name="meetingType" id="meetingType" required defaultValue={sacramentMeeting.meetingType}
                    className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200">
                    <option value="">Select type</option>
                    <option value="testimony">Testimony</option>
                    <option value="regular">Regular</option>
                    <option value="stake">Stake</option>
                    <option value="general">General</option>
                </select>
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="presiding" className="text-sm font-medium text-slate-700">Presiding</label>
                <input type="text" name="presiding" id="presiding" required defaultValue={sacramentMeeting.presiding}
                    className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200" />
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="conducting" className="text-sm font-medium text-slate-700">Conducting</label>
                <input type="text" name="conducting" id="conducting" required defaultValue={sacramentMeeting.conducting}
                    className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200" />
            </div>
        </div>

        {/* announcements: array of strings — simplest fix is one textarea, split on newline server-side */}
        <div className="flex flex-col gap-1.5">
            <label htmlFor="announcements" className="text-sm font-medium text-slate-700">Announcements (one per line)</label>
            <textarea name="announcements" id="announcements" rows={4} defaultValue={sacramentMeeting.announcements?.join("\n")}
                className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200" />
        </div>

        {/* openingHymn: object — split into number + title, or swap for a hymn-picker component */}
        <fieldset className="rounded-lg border border-slate-200 p-4">
            <legend className="px-1 text-sm font-medium text-slate-700">Opening Hymn</legend>
            <div className="flex gap-3">
                <input type="number" name="openingHymn.number" placeholder="Hymn #" required defaultValue={sacramentMeeting.openingHymn.number}
                    className="w-24 rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200" />
                <input type="text" name="openingHymn.title" placeholder="Title" required defaultValue={sacramentMeeting.openingHymn.title}
                    className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200" />
            </div>
        </fieldset>

        <div className="flex flex-col gap-1.5">
            <label htmlFor="openingPrayer" className="text-sm font-medium text-slate-700">Opening Prayer</label>
            <input type="text" name="openingPrayer" id="openingPrayer" required defaultValue={sacramentMeeting.openingPrayer}
                className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200" />
        </div>

        {/* wardBusiness: array of { description } — needs dynamic rows, see note below */}

        <label htmlFor="stakeBusiness" className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <input type="checkbox" name="stakeBusiness" id="stakeBusiness" defaultChecked={sacramentMeeting.stakeBusiness}
                className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400" />
            Stake Business
        </label>

        <fieldset className="rounded-lg border border-slate-200 p-4">
            <legend className="px-1 text-sm font-medium text-slate-700">Sacrament Hymn</legend>
            <div className="flex gap-3">
                <input type="number" name="sacramentHymn.number" placeholder="Hymn #" required defaultValue={sacramentMeeting.sacramentHymn.number}
                    className="w-24 rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200" />
                <input type="text" name="sacramentHymn.title" placeholder="Title" required defaultValue={sacramentMeeting.sacramentHymn.title}
                    className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200" />
            </div>
        </fieldset>
        {(sacramentMeeting.speakers.length != 0) ?
            < fieldset className="rounded-lg border border-slate-200 p-4">
                <legend className="px-1 text-sm font-medium text-slate-700">Speakers</legend>
                <div className="space-y-3">
                    <div className='speaker1 grid gap-3 sm:grid-cols-[1fr_1fr_auto]'>
                        <input type="text" name='name1' placeholder="Name" defaultValue={sacramentMeeting.speakers[0].name}
                            className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200" />
                        <input type="text" name='topic1' placeholder="Topic" defaultValue={sacramentMeeting.speakers[0].topic}
                            className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200" />
                        <select name="type1" id="type1" defaultValue={sacramentMeeting.speakers[0].type}
                            className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200">
                            <option value="speaker">Speaker</option>
                            <option value="musical-number">Musical Number</option>
                        </select>
                    </div>

                    <div className='speaker2 grid gap-3 sm:grid-cols-[1fr_1fr_auto]'>
                        <input type="text" name='name2' placeholder="Name" defaultValue={sacramentMeeting.speakers[1].name}
                            className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200" />
                        <input type="text" name='topic2' placeholder="Topic" defaultValue={sacramentMeeting.speakers[1].topic}
                            className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200" />
                        <select name="type2" id="type2" defaultValue={sacramentMeeting.speakers[1].type}
                            className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200">
                            <option value="speaker">Speaker</option>
                            <option value="musical-number">Musical Number</option>
                        </select>
                    </div>
                    <div className='speaker1 grid gap-3 sm:grid-cols-[1fr_1fr_auto]'>
                        <input type="text" name='name3' placeholder="Name" defaultValue={sacramentMeeting.speakers[2].name}
                            className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200" />
                        <input type="text" name='topic3' placeholder="Topic" defaultValue={sacramentMeeting.speakers[2].topic}
                            className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200" />
                        <select name="type3" id="type3" defaultValue={sacramentMeeting.speakers[2].type}
                            className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200">
                            <option value="speaker">Speaker</option>
                            <option value="musical-number">Musical Number</option>
                        </select>
                    </div>
                </div>
            </fieldset> : ""
        }
        <fieldset className="rounded-lg border border-slate-200 p-4">
            <legend className="px-1 text-sm font-medium text-slate-700">Closing Hymn</legend>
            <div className="flex gap-3">
                <input type="number" name="closingHymn.number" placeholder="Hymn #" required defaultValue={sacramentMeeting.closingHymn.number}
                    className="w-24 rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200" />
                <input type="text" name="closingHymn.title" placeholder="Title" required defaultValue={sacramentMeeting.closingHymn.title}
                    className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200" />
            </div>
        </fieldset>

        <div className="flex flex-col gap-1.5">
            <label htmlFor="closingPrayer" className="text-sm font-medium text-slate-700">Closing Prayer</label>
            <input type="text" name="closingPrayer" id="closingPrayer" required defaultValue={sacramentMeeting.closingPrayer}
                className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200" />
        </div>

        <button type="submit"
            className="w-full rounded-md bg-slate-900 px-4 py-2.5 font-medium text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 sm:w-auto">
            Save Meeting
        </button>
    </form >)
}