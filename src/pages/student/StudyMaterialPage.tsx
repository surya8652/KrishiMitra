import React, { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { 
  BookOpen, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Clock, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles, 
  Building2, 
  Code2, 
  HardHat, 
  Cpu, 
  LineChart, 
  HeartPulse, 
  ArrowRight, 
  FileText, 
  X,
  Printer
} from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { STUDY_NOTES, StudyNoteItem, CAREER_SECTORS } from '@/data/studentData'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogHeader, DialogBody, DialogFooter } from '@/components/ui/dialog'

export const StudyMaterialPage: React.FC = () => {
  const { t, showToast } = useApp()
  const [searchParams, setSearchParams] = useSearchParams()
  const sectorParam = searchParams.get('sector') || 'all'

  const [selectedSector, setSelectedSector] = useState<string>(sectorParam)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [activeNoteModal, setActiveNoteModal] = useState<StudyNoteItem | null>(null)
  const [savedNotes, setSavedNotes] = useState<string[]>([])

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSavedNotes(prev => {
      const exists = prev.includes(id)
      const next = exists ? prev.filter(item => item !== id) : [...prev, id]
      showToast(exists ? 'Removed from saved notes' : 'Note saved to your personal library')
      return next
    })
  }

  const handleDownload = (note: StudyNoteItem) => {
    // Generate simple text download blob
    const element = document.createElement('a')
    const file = new Blob([`${note.title}\nSector: ${note.sectorId}\nSubject: ${note.subject}\n\n${note.contentMarkdown}`], {
      type: 'text/markdown;charset=utf-8'
    })
    element.href = URL.createObjectURL(file)
    element.download = `${note.title.replace(/\s+/g, '_')}.md`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    showToast(`Downloaded: ${note.title}`)
  }

  const filteredNotes = STUDY_NOTES.filter(note => {
    const matchesSector = selectedSector === 'all' || note.sectorId === selectedSector
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          note.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesDiff = selectedDifficulty === 'all' || note.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
    return matchesSector && matchesSearch && matchesDiff
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-800">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {t.studyMaterial}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Curated lecture notes, formulas, geometry sheets & engineering cheat sheets
              </p>
            </div>
          </div>
        </div>

        <Link to="/students">
          <Button size="sm" variant="outline" className="text-xs font-bold gap-1.5 bg-white border-slate-300">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>Retake Career Analyzer</span>
          </Button>
        </Link>
      </div>

      {/* Sector Category Filters */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Filter by Sector:
          </span>
          {savedNotes.length > 0 && (
            <span className="text-xs text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded">
              {savedNotes.length} Saved in Library
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            type="button"
            onClick={() => {
              setSelectedSector('all')
              setSearchParams({})
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedSector === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            All Sectors ({STUDY_NOTES.length})
          </button>

          {CAREER_SECTORS.map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => {
                setSelectedSector(sec.id)
                setSearchParams({ sector: sec.id })
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedSector === sec.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {sec.title.split('(')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Secondary Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-8 relative">
          <Search className="h-4 w-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes by topic (e.g. Perspective, Calculus, Big-O, Statics, Architecture)..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="md:col-span-4 flex items-center gap-2">
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl text-xs font-bold px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Difficulty Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Notes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredNotes.map((note) => {
          const isSaved = savedNotes.includes(note.id)

          return (
            <div
              key={note.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-5 space-y-3">
                {/* Meta header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {note.subject}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {note.level}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => toggleBookmark(note.id, e)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 cursor-pointer"
                    title={isSaved ? "Saved" : "Save note"}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="h-4 w-4 text-indigo-600 fill-indigo-100" />
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    {note.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                    {note.description}
                  </p>
                </div>

                {/* Key Formulas Preview */}
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Core Formulas & Highlights:
                  </span>
                  <p className="text-[11px] font-mono text-slate-700 line-clamp-2">
                    {note.keyFormulasAndConcepts[0]}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {note.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center gap-1 text-slate-500 text-[11px]">
                  <Clock className="h-3 w-3" />
                  <span>{note.readTime}</span>
                </span>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(note)}
                    className="h-8 text-xs font-bold gap-1 bg-white cursor-pointer px-2.5"
                    title="Download Note File"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Save</span>
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => setActiveNoteModal(note)}
                    className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold gap-1 cursor-pointer px-3"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Read Notes</span>
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredNotes.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <BookOpen className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-base">No notes matched your filter</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting the search query or selecting "All Sectors".</p>
          <Button
            size="sm"
            onClick={() => { setSelectedSector('all'); setSearchQuery(''); }}
            className="mt-4 bg-slate-800 text-white text-xs font-bold"
          >
            Reset Filters
          </Button>
        </div>
      )}

      {/* Read Note In-App Modal / Viewer */}
      {activeNoteModal && (
        <Dialog open={true} onClose={() => setActiveNoteModal(null)}>
          <DialogHeader onClose={() => setActiveNoteModal(null)}>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                  {activeNoteModal.subject}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">
                  {activeNoteModal.readTime} • {activeNoteModal.difficulty}
                </span>
              </div>
              <h2 className="text-xl font-black text-slate-900">
                {activeNoteModal.title}
              </h2>
            </div>
          </DialogHeader>

          <DialogBody className="space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Highlights Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 space-y-1.5">
              <span className="text-xs font-extrabold text-amber-950 uppercase tracking-wider block">
                Key Formulas & Examination Takeaways:
              </span>
              <ul className="space-y-1 text-xs text-amber-900">
                {activeNoteModal.keyFormulasAndConcepts.map((item, idx) => (
                  <li key={idx} className="font-mono">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Note Content */}
            <div className="prose prose-sm max-w-none text-slate-800 space-y-3 font-sans leading-relaxed whitespace-pre-line text-xs sm:text-sm">
              {activeNoteModal.contentMarkdown}
            </div>
          </DialogBody>

          <DialogFooter>
            <div className="flex items-center justify-between w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="text-xs font-bold gap-1 cursor-pointer"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print Notes</span>
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDownload(activeNoteModal)}
                  className="text-xs font-bold gap-1 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download .MD / PDF</span>
                </Button>

                <Button
                  size="sm"
                  onClick={() => setActiveNoteModal(null)}
                  className="bg-slate-900 text-white text-xs font-bold cursor-pointer"
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  )
}
