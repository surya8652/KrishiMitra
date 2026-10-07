import React, { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Dialog, DialogHeader, DialogBody, DialogFooter } from '@/components/ui/dialog'
import { MarketplaceListing } from '@/types'
import { 
  ShoppingBag, 
  Plus, 
  Search, 
  MapPin, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  Tag, 
  User, 
  Eye, 
  ShieldCheck,
  Camera,
  Filter
} from 'lucide-react'

export const MarketplacePage: React.FC = () => {
  const { marketplaceListings, addMarketplaceListing, farmer, showToast, t } = useApp()
  const [tab, setTab] = useState('buy')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)

  // Sell form state
  const [sellCrop, setSellCrop] = useState('Fresh Farm Tomatoes')
  const [sellQty, setSellQty] = useState('50')
  const [sellUnit, setSellUnit] = useState<'Quintals' | 'Kg' | 'Crates' | 'Tons'>('Crates')
  const [sellPrice, setSellPrice] = useState('480')
  const [sellLocation, setSellLocation] = useState(`${farmer.village}, ${farmer.district}`)
  const [sellDescription, setSellDescription] = useState('Freshly harvested ripe produce, graded and packed.')
  const [sellPhoto, setSellPhoto] = useState('https://images.unsplash.com/photo-1592417817098-8f3d69102432?auto=format&fit=crop&w=500&q=80')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSellSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await addMarketplaceListing({
        type: 'sell',
        crop: sellCrop,
        quantity: parseFloat(sellQty) || 1,
        unit: sellUnit,
        pricePerUnit: parseFloat(sellPrice) || 0,
        location: sellLocation,
        district: farmer.district,
        state: farmer.state,
        sellerName: farmer.name,
        sellerPhone: farmer.phone,
        imageUrl: sellPhoto,
        qualityGrade: 'Grade A',
        organicCertified: false,
        description: sellDescription
      })
      setTab('buy')
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredListings = marketplaceListings.filter((item) => {
    const matchesSearch = item.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-orange-100 text-orange-800">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Farmer Marketplace
            </h1>
            <p className="text-sm text-gray-600">
              Connect directly with verified local buyers and fellow farmers. No middleman commission.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs: BUY and SELL */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="grid grid-cols-2 max-w-md w-full bg-[#EFEBE9]">
          <TabsTrigger value="buy" className="text-sm sm:text-base font-bold">
            {t.buyTab} ({filteredListings.length})
          </TabsTrigger>
          <TabsTrigger value="sell" className="text-sm sm:text-base font-bold">
            + {t.sellTab}
          </TabsTrigger>
        </TabsList>

        {/* BUY TAB */}
        <TabsContent value="buy" className="space-y-4 pt-2">
          {/* Search bar */}
          <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-3">
            <Input
              type="text"
              placeholder="Search crop name or location (e.g. Tomato, Onion, Nashik)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="h-4 w-4" />}
              className="border-0 shadow-none focus-visible:ring-0"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-gray-400 hover:text-gray-600 font-bold px-2 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredListings.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-md transition-all flex flex-col justify-between border-gray-200">
                <div>
                  {/* Photo & Badges */}
                  <div className="relative aspect-16/10 bg-gray-100 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.crop}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <Badge variant={item.type === 'sell' ? 'success' : 'warning'}>
                        {item.type === 'sell' ? 'FOR SALE' : 'BUYING DEMAND'}
                      </Badge>
                      {item.organicCertified && (
                        <Badge variant="earth">Organic</Badge>
                      )}
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-extrabold text-base sm:text-lg text-gray-900 leading-tight">
                        {item.crop}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <MapPin className="h-3.5 w-3.5 text-[#1B5E20]" />
                      <span>{item.location}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div>
                        <span className="text-xs text-gray-400 block font-semibold">Quantity</span>
                        <span className="font-bold text-sm text-gray-800">
                          {item.quantity} {item.unit}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-400 block font-semibold">Price</span>
                        <span className="font-black text-lg text-[#1B5E20]">
                          ₹{item.pricePerUnit.toLocaleString('en-IN')}{' '}
                          <span className="text-xs text-gray-500 font-normal">/{item.unit.slice(0, -1)}</span>
                        </span>
                      </div>
                    </div>

                    <div className="pt-1 flex items-center gap-2 text-xs text-gray-600 bg-[#F8F9F5] p-2 rounded-lg">
                      <User className="h-3.5 w-3.5 text-gray-400" />
                      <span className="font-medium truncate">{item.sellerName}</span>
                    </div>
                  </div>
                </div>

                {/* Actions: View & Contact */}
                <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedListing(item)
                      setViewModalOpen(true)
                    }}
                    className="w-full text-xs font-bold gap-1 cursor-pointer"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>View</span>
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      setSelectedListing(item)
                      setContactModalOpen(true)
                    }}
                    className="w-full bg-[#1B5E20] hover:bg-[#144818] text-white text-xs font-bold gap-1 cursor-pointer"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>Contact</span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center space-y-3">
              <ShoppingBag className="h-10 w-10 mx-auto text-gray-300" />
              <h3 className="font-bold text-base text-gray-800">No Listings Found</h3>
              <p className="text-xs text-gray-500">
                Try searching for another crop name or list your harvest to sell.
              </p>
            </div>
          )}
        </TabsContent>

        {/* SELL TAB */}
        <TabsContent value="sell" className="max-w-xl mx-auto pt-2">
          <Card className="border-gray-200 shadow-sm">
            <div className="p-5 sm:p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">List Harvest for Sale</h3>
              <p className="text-xs text-gray-500 mt-1">
                Post your produce so bulk buyers and wholesalers can reach you directly.
              </p>
            </div>

            <CardContent className="p-5 sm:p-6">
              <form onSubmit={handleSellSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Crop Name / पिकाचे नाव
                  </label>
                  <Input
                    type="text"
                    value={sellCrop}
                    onChange={(e) => setSellCrop(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Quantity Available
                    </label>
                    <Input
                      type="number"
                      value={sellQty}
                      onChange={(e) => setSellQty(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Unit
                    </label>
                    <select
                      value={sellUnit}
                      onChange={(e) => setSellUnit(e.target.value as any)}
                      className="w-full h-12 rounded-lg border border-gray-300 px-3 bg-white text-sm"
                    >
                      <option value="Crates">Crates (20kg crate)</option>
                      <option value="Quintals">Quintals (100kg bag)</option>
                      <option value="Tons">Tons</option>
                      <option value="Kg">Kg</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Expected Price (₹ / Unit)
                    </label>
                    <Input
                      type="number"
                      value={sellPrice}
                      onChange={(e) => setSellPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Location / Farm Gate
                    </label>
                    <Input
                      type="text"
                      value={sellLocation}
                      onChange={(e) => setSellLocation(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Photo URL or Image Preset
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={sellPhoto}
                      onChange={(e) => setSellPhoto(e.target.value)}
                      icon={<Camera className="h-4 w-4" />}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Description / Extra Notes
                  </label>
                  <textarea
                    rows={3}
                    value={sellDescription}
                    onChange={(e) => setSellDescription(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                  />
                </div>

                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="w-full bg-[#1B5E20] hover:bg-[#144818] text-white font-bold h-12 text-base cursor-pointer shadow-sm"
                >
                  Publish Listing to Marketplace
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Details Modal */}
      {selectedListing && (
        <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
          <DialogHeader
            title={selectedListing.crop}
            description={`Posted by ${selectedListing.sellerName} from ${selectedListing.location}`}
            onClose={() => setViewModalOpen(false)}
          />
          <DialogBody>
            <div className="space-y-4">
              <img
                src={selectedListing.imageUrl}
                alt={selectedListing.crop}
                className="w-full h-48 object-cover rounded-xl border border-gray-200"
              />

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 rounded-lg bg-gray-50">
                  <span className="text-xs text-gray-400 block font-semibold">Available Quantity</span>
                  <span className="font-bold text-gray-900">{selectedListing.quantity} {selectedListing.unit}</span>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <span className="text-xs text-gray-400 block font-semibold">Price</span>
                  <span className="font-extrabold text-[#1B5E20] text-base">₹{selectedListing.pricePerUnit} / {selectedListing.unit.slice(0, -1)}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase text-gray-500 block mb-1">Description</span>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed bg-[#F8F9F5] p-3 rounded-xl border border-gray-200">
                  {selectedListing.description}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                <ShieldCheck className="h-4 w-4" />
                <span>Verified Farmer Gate Listing</span>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setViewModalOpen(false)}
              className="text-xs font-bold"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setViewModalOpen(false)
                setContactModalOpen(true)
              }}
              className="bg-[#1B5E20] hover:bg-[#144818] text-white text-xs font-bold gap-1"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Contact Seller</span>
            </Button>
          </DialogFooter>
        </Dialog>
      )}

      {/* Contact Seller Modal */}
      {selectedListing && (
        <Dialog open={contactModalOpen} onOpenChange={setContactModalOpen}>
          <DialogHeader
            title="Contact Farmer / Buyer"
            description="Direct communication with seller."
            onClose={() => setContactModalOpen(false)}
          />
          <DialogBody>
            <div className="space-y-4 text-center py-2">
              <div className="mx-auto h-16 w-16 rounded-full bg-[#E8F5E9] text-[#1B5E20] flex items-center justify-center font-bold text-2xl">
                {selectedListing.sellerName.charAt(0)}
              </div>

              <div>
                <h4 className="font-bold text-lg text-gray-900">{selectedListing.sellerName}</h4>
                <p className="text-xs text-gray-500">{selectedListing.location}</p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                <span className="text-xs text-gray-400 font-bold uppercase block">Mobile Number</span>
                <a
                  href={`tel:${selectedListing.sellerPhone}`}
                  className="text-xl font-extrabold text-[#1B5E20] hover:underline block"
                >
                  {selectedListing.sellerPhone}
                </a>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:${selectedListing.sellerPhone}`}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#1B5E20] text-white font-bold text-sm hover:bg-[#144818]"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Farmer</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    showToast('WhatsApp Chat initiated with Farmer')
                    setContactModalOpen(false)
                  }}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#25D366] text-white font-bold text-sm hover:bg-[#1EBE5D] cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setContactModalOpen(false)}
              className="w-full text-xs font-bold"
            >
              Done
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  )
}
