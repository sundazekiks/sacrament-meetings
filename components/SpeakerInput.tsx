

interface Speaker {
    name: string
    topic: string
    type: "musical-number" | "speaker"
}


export default function SpeakerCard({ speaker }: { speaker: Speaker }) {
    return (< fieldset className="rounded-lg border border-slate-200 p-4">
        <legend className="px-1 text-sm font-medium text-slate-700">Speakers</legend>
        <div className="space-y-3">
            <div className='speaker1 grid gap-3 sm:grid-cols-[1fr_1fr_auto]'>
                <input type="text" name="name" placeholder="Name" defaultValue={speaker.name}
                    className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200" />
                <input type="text" name="topic" placeholder="Topic" defaultValue={speaker.topic}
                    className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200" />
                <select name="type" id="type" defaultValue={speaker.type}
                    className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200">
                    <option value="speaker">Speaker</option>
                    <option value="musical-number">Musical Number</option>
                </select>
            </div>
        </div>
    </fieldset>)
}