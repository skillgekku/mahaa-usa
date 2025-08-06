import React from 'react';
import { ChevronRight } from 'lucide-react';

const TeluguNewsUI = () => {
  const newsArticles = [
    {
      id: 1,
      image: "https://mahaanews.co.in/wp-content/uploads/2025/08/Your-paragraph-text-24.jpg",
      title: "Band Infusion: ప్రపంచ దేశాల్లోనూ సత్తా చాటుతున్న బ్యాండ్ ఇన్ఫ్యూషన్",
      author: "MAHAA News",
    },
    {
      id: 2,
      image: "https://mahaanews.co.in/wp-content/uploads/2025/08/Your-paragraph-text-24.jpg",
      title: "క్రికెట్: భారత జట్టు విజయవంతమైన పర్యటన పూర్తి చేసుకుంది",
      author: "MAHAA News",
    },
    {
      id: 3,
      image: "https://mahaanews.co.in/wp-content/uploads/2025/08/Your-paragraph-text-24.jpg",
      title: "టెన్నిస్: కొత్త చాంపియన్ ఎమర్జ్ అయ్యాడు అంతర్జాతీయ టోర్నమెంట్‌లో",
      author: "MAHAA News",
    },
    {
      id: 4,
      image: "https://mahaanews.co.in/wp-content/uploads/2025/08/Your-paragraph-text-24.jpg",
      title: "ఫుట్‌బాల్: ప్రపంచకప్ క్వాలిఫైయర్స్‌లో భారత్ గొప్ప విజయం",
      author: "MAHAA News",
    },
    {
      id: 5,
      image: "https://mahaanews.co.in/wp-content/uploads/2025/08/Your-paragraph-text-24.jpg",
      title: "బాడ్మింటన్: ఒలింపిక్ మెడల్ విజేత కొత్త రికార్డ్ సృష్టించారు",
      author: "MAHAA News",
    },
  ];

   const Articles = [
    {
      id: 1,
      image: "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/Adverts/elyzium.jpeg",
      title: "Band Elyzium",
      author: "MAHAA News",
    },
    {
      id: 2,
      image: "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/Adverts/elyzium.jpeg",
      title: "Band Elyzium",
      author: "MAHAA News",
    },
    {
      id: 3,
      image: "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/Adverts/elyzium.jpeg",
      title: "Band Elyzium",
      author: "MAHAA News",
    },
    {
      id: 4,
      image: "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/Adverts/elyzium.jpeg",
      title: "Band Elyzium",
      author: "MAHAA News",
    },
    {
      id: 5,
      image: "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/Adverts/elyzium.jpeg",
      title: "Band Elyzium",
      author: "MAHAA News",
    },
  ];

  // Duplicate articles for seamless loop
  const duplicatedArticles = [...newsArticles, ...newsArticles];
  const duplicatedAdverts = [...Articles, ...Articles];


  return (
    <div className="max-w-7xl mx-auto bg-black shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Left Section - News Articles */}
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-red-500 border-b-3 border-red-500 pb-2">
                స్పోర్ట్స్
              </h2>
            </div>
            <div className="flex items-center text-gray-400">
              <span className="text-sm">మరిన్ని</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Scrolling Container */}
          <div className="h-96 overflow-hidden relative">
            <div className="animate-scroll space-y-6">
              {duplicatedArticles.map((article, index) => (
                <div key={`${article.id}-${index}`} className="flex gap-4 hover:bg-gray-800 p-3 rounded-lg transition-colors cursor-pointer">
                  {/* Article Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={article.image}
                      alt="News"
                      className="w-28 h-20 object-cover rounded-lg"
                    />
                  </div>
                  
                  {/* Article Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2 leading-tight">
                      {article.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-400 text-sm space-x-4">
                      <div className="flex items-center">
                        <span className="w-4 h-4 bg-gray-600 rounded-full mr-2"></span>
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-4 h-4 bg-gray-600 rounded-sm mr-2"></span>
                        <span>Comments</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
            <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
             
            </div>
            </div>
            {/* scrolling adverts */}
        <div className="h-96 overflow-hidden relative">
            <div className="animate-scroll space-y-6">
              {duplicatedAdverts.map((article, index) => (
                <div key={`${article.id}-${index}`} className="flex gap-4 hover:bg-gray-800 p-3 rounded-lg transition-colors cursor-pointer">
                  {/* Article Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={article.image}
                      alt="News"
                      className="w-100 h-120 object-cover rounded-lg"
                    />
                  </div>
                  
                 
                </div>
              ))}
            </div>
          </div>
        </div>
        

        

      
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default TeluguNewsUI;