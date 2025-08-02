"use client"
import { useState, useEffect } from "react"

interface NewsArticle {
  id: string
  title: string
  author: string
  comments: number
  image: string
}

const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Hyderabad News: గోల్కొండ పరిసరాల్లో సీసీ కెమెరాకు దిక్కున చిరుత",
    author: "Maneesh",
    comments: 0,
    image: "/placeholder.svg?height=100&width=150&text=Hyderabad+News",
  },
  {
    id: "2",
    title: "Cannabis chocolates: తెలంగాణలో గంజాయి చాక్లెట్లు కలకలం..",
    author: "Maneesh",
    comments: 0,
    image: "/placeholder.svg?height=100&width=150&text=Cannabis+News",
  },
  {
    id: "3",
    title: "Shubman Gill: 47 వ్యక్తి నాటి సునీల్ గవాస్కర్ రికార్డును అధిగమించిన గిల్",
    author: "Mahaa News Team",
    comments: 0,
    image: "/placeholder.svg?height=100&width=150&text=Shubman+Gill",
  },
  {
    id: "4",
    title: "Abhishek Sharma: అభిషేక్ శర్మ అర్ధశతకం.. ట్వెంటీ హాఫ్ సెంచరీ అధిగమించి",
    author: "Mahaa News Team",
    comments: 0,
    image: "/placeholder.svg?height=100&width=150&text=Abhishek+Sharma",
  },
  {
    id: "5",
    title: "Karimnagar: మాజీ సర్పంచ్ భర్త అత్యాచారయత్నం.. పెండింగ్ బిల్లులు రాక మనవేసం",
    author: "Maneesh",
    comments: 0,
    image: "/placeholder.svg?height=100&width=150&text=Karimnagar+News",
  },
  {
    id: "6",
    title: "Chahal: అత్యంతవేగ చేసుకోవాలనుకున్న.. విదాకులపై చాహల్ సంచలన కామెంట్స్",
    author: "Mahaa News Team",
    comments: 0,
    image: "/placeholder.svg?height=100&width=150&text=Chahal+News",
  },
  {
    id: "7",
    title: "Telangana Politics: రాష్ట్ర రాజకీయాల్లో కొత్త మలుపు.. కాంగ్రెస్ పార్టీ కీలక నిర్ణయం",
    author: "Maneesh",
    comments: 0,
    image: "/placeholder.svg?height=100&width=150&text=Politics+News",
  },
  {
    id: "8",
    title: "IPL 2024: హైదరాబాద్ జట్టుకు గుడ్ న్యూస్.. కీలక ఆటగాడు రికవరీ",
    author: "Mahaa News Team",
    comments: 0,
    image: "/placeholder.svg?height=100&width=150&text=IPL+News",
  },
]

// Ad Banner Component
const AdBanner = ({ position, className = "" }: { position: 'left' | 'right', className?: string }) => {
  return (
    <div className={`${className} hidden xl:block`}>
      <div className="sticky top-8 space-y-4">
        {/* Ad Banner 1 */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
          <div className="text-center">
            <h3 className="font-bold text-lg mb-2">విజ్ఞాపనం</h3>
            <div className="bg-white/20 rounded-lg p-4 mb-4">
              <div className="w-full h-32 bg-white/10 rounded flex items-center justify-center">
                <span className="text-sm opacity-75">300x250</span>
              </div>
            </div>
            <p className="text-sm opacity-90">మీ వ్యాపారం ఇక్కడ ప్రచారం చేయండి</p>
          </div>
        </div>

        {/* Ad Banner 2 */}
        <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-lg p-6 text-white shadow-lg">
          <div className="text-center">
            <h3 className="font-bold text-lg mb-2">ప్రమోషన్</h3>
            <div className="bg-white/20 rounded-lg p-4 mb-4">
              <div className="w-full h-32 bg-white/10 rounded flex items-center justify-center">
                <span className="text-sm opacity-75">300x250</span>
              </div>
            </div>
            <p className="text-sm opacity-90">కొత్త ఆఫర్లు మరియు డిస్కౌంట్లు</p>
          </div>
        </div>

        {/* Ad Banner 3 */}
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-lg p-6 text-white shadow-lg">
          <div className="text-center">
            <h3 className="font-bold text-lg mb-2">సర్వీసెస్</h3>
            <div className="bg-white/20 rounded-lg p-4 mb-4">
              <div className="w-full h-32 bg-white/10 rounded flex items-center justify-center">
                <span className="text-sm opacity-75">300x250</span>
              </div>
            </div>
            <p className="text-sm opacity-90">మీకు అవసరమైన సేవలు</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TeluguNewsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-scroll functionality
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const maxIndex = newsArticles.length - 3
          return prevIndex >= maxIndex ? 0 : prevIndex + 1
        })
      }, 3000) // Change every 3 seconds

      return () => clearInterval(interval)
    }
  }, [isPaused])

  // Get current 3 articles to display
  const getCurrentArticles = () => {
    const articles = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % newsArticles.length
      articles.push(newsArticles[index])
    }
    return articles
  }

  const currentArticles = getCurrentArticles()

  return (
    <div className="min-h-screen bg-gray-50">
    
    </div>
  )
}