import React, { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { 
  Youtube, 
  Play, 
  ExternalLink, 
  Clock, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  Filter, 
  Search,
  BookOpen,
  X
} from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { YOUTUBE_LECTURES, YouTubeLectureItem, CAREER_SECTORS } from '@/data/studentData'
import { Button } from '@/components/ui/button'
import { Dialog, DialogHeader, DialogBody, DialogFooter } from '@/components/ui/dialog'

export const YouTubeLecturesPage: React.FC = () => {
  const { t, showToast } = useApp()
  const [searchParams, setSearchParams] = useSearchParams()
  const sectorParam = searchParams.get('sector') || 'all'

  const [selectedSector, setSelectedSector] = useState<string>(sectorParam)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [activeVideoModal, setActiveVideoModal] = useState<YouTubeLectureItem | null>(null)

  const filteredVideos = YOUTUBE_LECTURES.filter(video => {
    const matchesSector = selectedSector === 'all' || video.sectorId === selectedSector
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.subject.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSector && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-red-100 text-red-700">
            <Youtube className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t.youtubeLectures}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              High-quality visual video masterclasses from world-renowned educators and architects
            </p>
          </div>
        </div>

        <Link to="/students/study-material">
          <Button size="sm" variant="outline" className="text-xs font-bold gap-1.5 bg-white border-slate-300">
            <BookOpen className="h-3.5 w-3.5 text-indigo-600" />
            <span>Read Study Notes</span>
          </Button>
        </Link>
      </div>

      {/* Sector Category Filters */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
          Filter by Sector:
        </span>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            type="button"
            onClick={() => {
              setSelectedSector('all')
              setSearchParams({})
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedSector === 'all'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            All Videos ({YOUTUBE_LECTURES.length})
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
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {sec.title.split('(')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="h-4 w-4 absolute left-3.5 top-3.5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by topic, channel (e.g. 3Blue1Brown, CS50, Architecture, Perspective)..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-2xl border border-slate-200 hover:border-red-400 hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group"
          >
            <div>
              {/* YouTube Thumbnail with Play Button Overlay */}
              <div 
                className="relative aspect-video bg-slate-900 cursor-pointer overflow-hidden group/thumb"
                onClick={() => setActiveVideoModal(video)}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300 opacity-90"
                />
                <div className="absolute inset-0 bg-black/20 group-hover/thumb:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-red-600 group-hover/thumb:scale-110 text-white flex items-center justify-center shadow-lg transition-transform">
                    <Play className="h-6 w-6 ml-0.5 fill-white" />
                  </div>
                </div>

                <span className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[11px] font-mono font-bold px-2 py-0.5 rounded">
                  {video.duration}
                </span>

                <span className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded shadow-xs">
                  {video.subject}
                </span>
              </div>

              {/* Video Info */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>{video.channel}</span>
                  <span>{video.views}</span>
                </div>

                <h3 
                  onClick={() => setActiveVideoModal(video)}
                  className="text-base font-extrabold text-slate-900 group-hover:text-red-600 transition-colors leading-snug cursor-pointer"
                >
                  {video.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {video.description}
                </p>

                {/* Key takeaways */}
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    What You'll Learn:
                  </span>
                  <p className="text-[11px] text-slate-700 font-medium">
                    • {video.keyTakeaways[0]}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
              <a
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors"
              >
                <span>YouTube.com</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <Button
                size="sm"
                onClick={() => setActiveVideoModal(video)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold gap-1.5 cursor-pointer"
              >
                <Play className="h-3.5 w-3.5 fill-white" />
                <span>Watch Video</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Embedded Video Player Modal */}
      {activeVideoModal && (
        <Dialog open={true} onClose={() => setActiveVideoModal(null)}>
          <DialogHeader onClose={() => setActiveVideoModal(null)}>
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-red-600">
                {activeVideoModal.channel} • {activeVideoModal.subject}
              </span>
              <h2 className="text-lg font-black text-slate-900 line-clamp-1">
                {activeVideoModal.title}
              </h2>
            </div>
          </DialogHeader>

          <DialogBody className="space-y-4">
            {/* Embedded YouTube Iframe */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black shadow-inner">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideoModal.youtubeId}?autoplay=1&rel=0`}
                title={activeVideoModal.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Video Takeaways */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
                Lecture Summary & Key Concepts:
              </span>
              <ul className="space-y-1 text-xs text-slate-600">
                {activeVideoModal.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </DialogBody>

          <DialogFooter>
            <div className="flex items-center justify-between w-full">
              <a
                href={`https://www.youtube.com/watch?v=${activeVideoModal.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"
              >
                <span>Open directly on YouTube app</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <Button
                size="sm"
                onClick={() => setActiveVideoModal(null)}
                className="bg-slate-900 text-white text-xs font-bold cursor-pointer"
              >
                Close Video
              </Button>
            </div>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  )
}
