import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, MapPin, Sun, Info, CalendarDays, Loader2, Download, Trash2, History, Wind, Droplets, Thermometer, Pencil, Check, X, Github, Linkedin, CloudSun, CloudRain, Snowflake, Cloud, Zap } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

// Floating weather background particles
function FloatingParticles() {
  const particles = [
    { icon: '☀️', size: 28, left: 5, duration: 25, delay: 0 },
    { icon: '🌧️', size: 22, left: 15, duration: 30, delay: 5 },
    { icon: '❄️', size: 18, left: 25, duration: 28, delay: 10 },
    { icon: '⛅', size: 24, left: 40, duration: 22, delay: 3 },
    { icon: '🌤️', size: 20, left: 55, duration: 35, delay: 8 },
    { icon: '🌩️', size: 26, left: 65, duration: 27, delay: 12 },
    { icon: '💨', size: 20, left: 75, duration: 32, delay: 6 },
    { icon: '🌈', size: 22, left: 85, duration: 29, delay: 15 },
    { icon: '☁️', size: 30, left: 92, duration: 24, delay: 2 },
    { icon: '🌙', size: 18, left: 48, duration: 33, delay: 18 },
  ];

  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className="floating-particle"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.icon}
        </div>
      ))}
    </>
  );
}

// Weather condition icon component
function WeatherIcon({ condition }: { condition: string }) {
  const iconClass = "w-5 h-5";
  switch (condition?.toLowerCase()) {
    case 'clear': return <Sun className={`${iconClass} text-yellow-400`} />;
    case 'clouds': return <Cloud className={`${iconClass} text-slate-400`} />;
    case 'rain':
    case 'drizzle': return <CloudRain className={`${iconClass} text-blue-400`} />;
    case 'snow': return <Snowflake className={`${iconClass} text-cyan-300`} />;
    case 'thunderstorm': return <Zap className={`${iconClass} text-yellow-300`} />;
    default: return <CloudSun className={`${iconClass} text-slate-300`} />;
  }
}

function App() {
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mediaIntegrations, setMediaIntegrations] = useState<any>(null);
  
  const [history, setHistory] = useState<any[]>([]);
  const [view, setView] = useState<'search' | 'history'>('search');

  // Edit notes state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState('');

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_BASE}/weather/history`);
      setHistory(res.data);
    } catch(e) {
      console.error('Failed to fetch history');
    }
  }

  useEffect(() => {
    if (view === 'history') {
      fetchHistory();
    }
  }, [view]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post(`${API_BASE}/weather/search`, { location: query });
      setWeatherData(res.data);
      
      const mediaRes = await axios.get(`${API_BASE}/integrations/media?location=${query}`);
      setMediaIntegrations(mediaRes.data);
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to fetch weather data');
      setWeatherData(null);
      setMediaIntegrations(null);
    } finally {
      setLoading(false);
    }
  };

  const deleteHistory = async (id: string) => {
    try {
      await axios.delete(`${API_BASE}/weather/history/${id}`);
      fetchHistory();
    } catch(e) {
      alert('Failed to delete');
    }
  }

  const startEditing = (item: any) => {
    setEditingId(item.id);
    setEditNotes(item.notes || '');
  }

  const saveNotes = async (id: string) => {
    try {
      await axios.put(`${API_BASE}/weather/history/${id}`, { notes: editNotes });
      setEditingId(null);
      fetchHistory();
    } catch(e) {
      alert('Failed to update');
    }
  }

  const exportData = (format: 'csv' | 'json') => {
    window.open(`${API_BASE}/export/${format}`, '_blank');
  }

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  return (
    <div className="animated-bg min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <FloatingParticles />

      {/* All content is relative z-10 to sit above particles */}
      <header className="mb-8 flex flex-col items-center w-full max-w-4xl relative z-10 fade-in-up">
        <div className="flex items-center gap-3 mb-2">
          <CloudSun className="w-10 h-10 text-blue-400 bounce-subtle" />
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 text-center">
            Weather App
          </h1>
        </div>
        <p className="text-slate-400 text-sm tracking-wide">AI Engineer Intern — PM Accelerator</p>
        
        <div className="flex gap-4 mt-6">
          <button onClick={() => setView('search')} className={`btn-press px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${view === 'search' ? 'bg-blue-600 shadow-lg shadow-blue-500/25 outline-none' : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}>
            <Search className="w-4 h-4 inline mr-2"/>
            Search Weather
          </button>
          <button onClick={() => setView('history')} className={`btn-press px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${view === 'history' ? 'bg-blue-600 shadow-lg shadow-blue-500/25 outline-none' : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}>
            <History className="w-4 h-4 inline mr-2"/>
            Search History
          </button>
        </div>
      </header>

      <main className="w-full max-w-4xl relative z-10">
        {view === 'search' ? (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-12">
            {/* Left Col: Search */}
            <section className="md:col-span-5 bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-700/50 h-fit card-glow fade-in-up fade-in-up-delay-1">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-400" /> Find Location
              </h2>
              <form onSubmit={handleSearch} className="flex flex-col gap-4">
                <input 
                  type="text" 
                  placeholder="City, Zip code, or Coordinates (lat,lon)..." 
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="px-4 py-3 bg-slate-900/80 rounded-xl border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-500"
                />
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-press bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium py-3 rounded-xl transition-all flex justify-center items-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Search className="w-4 h-4" /> Get Weather</>}
                </button>
              </form>

              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm flex gap-2 scale-in">
                  <Info className="w-5 h-5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              {/* Extra weather details */}
              {weatherData && (
                <div className="mt-6 grid grid-cols-2 gap-3 fade-in-up fade-in-up-delay-3">
                  <div className="bg-slate-900/60 rounded-xl p-3 flex items-center gap-2 border border-slate-700/50 card-glow">
                    <Thermometer className="w-4 h-4 text-orange-400" />
                    <div>
                      <p className="text-xs text-slate-500">Feels Like</p>
                      <p className="text-sm font-medium">{weatherData.feelsLike ? Math.round(weatherData.feelsLike) : '--'}°C</p>
                    </div>
                  </div>
                  <div className="bg-slate-900/60 rounded-xl p-3 flex items-center gap-2 border border-slate-700/50 card-glow">
                    <Droplets className="w-4 h-4 text-blue-400" />
                    <div>
                      <p className="text-xs text-slate-500">Humidity</p>
                      <p className="text-sm font-medium">{weatherData.humidity ?? '--'}%</p>
                    </div>
                  </div>
                  <div className="bg-slate-900/60 rounded-xl p-3 flex items-center gap-2 border border-slate-700/50 col-span-2 card-glow">
                    <Wind className="w-4 h-4 text-emerald-400" />
                    <div>
                      <p className="text-xs text-slate-500">Wind Speed</p>
                      <p className="text-sm font-medium">{weatherData.windSpeed ?? '--'} m/s</p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Right Col: Results */}
            <section className="md:col-span-7 flex flex-col gap-6">
              {weatherData ? (
                <>
                  <div className="bg-gradient-to-br from-indigo-900/80 to-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-indigo-500/30 card-glow scale-in">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-3xl font-bold flex items-center gap-2">
                          <MapPin className="w-6 h-6 text-indigo-400" />
                          {weatherData.foundLocationName}
                        </h2>
                        <div className="flex items-center gap-1 mt-1">
                          {weatherData.icon && (
                            <img src={getWeatherIcon(weatherData.icon)} alt={weatherData.description} className="w-12 h-12 -ml-1 drop-shadow-lg" />
                          )}
                          <p className="text-indigo-200 capitalize text-lg">{weatherData.description || weatherData.condition}</p>
                        </div>
                      </div>
                      <div className="text-5xl font-extrabold text-white temp-glow">
                        {Math.round(weatherData.temperature)}°C
                      </div>
                    </div>
                  </div>
                  
                  {weatherData.forecastData && (
                    <div className="bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-700/50 overflow-hidden fade-in-up fade-in-up-delay-2">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <CalendarDays className="w-5 h-5 text-emerald-400" /> 5-Day Forecast
                      </h3>
                      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
                        {weatherData.forecastData.list?.filter((_:any, i:number) => i % 8 === 0).map((f:any, i:number) => (
                          <div key={i} className="forecast-card min-w-[110px] bg-slate-900/60 rounded-xl p-4 text-center border border-slate-700/50 flex-shrink-0 card-glow" style={{ animationDelay: `${i * 0.1}s` }}>
                            <p className="text-sm text-slate-400 mb-1">{new Date(f.dt * 1000).toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric'})}</p>
                            {f.weather[0].icon && (
                              <img src={getWeatherIcon(f.weather[0].icon)} alt={f.weather[0].main} className="w-10 h-10 mx-auto drop-shadow-md" />
                            )}
                            <p className="font-bold text-lg">{Math.round(f.main.temp)}°</p>
                            <p className="text-xs text-slate-500 capitalize">{f.weather[0].description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {mediaIntegrations && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 fade-in-up fade-in-up-delay-3">
                      {mediaIntegrations.googleMapsEmbedUrl && (
                        <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 h-48 relative card-glow">
                          <iframe
                            title="Google Maps"
                            src={mediaIntegrations.googleMapsEmbedUrl}
                            className="absolute inset-0 w-full h-full border-0"
                            allowFullScreen
                          ></iframe>
                        </div>
                      )}
                      {mediaIntegrations.videoId && (
                        <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 h-48 relative card-glow">
                          <iframe 
                            className="absolute inset-0 w-full h-full border-0"
                            src={`https://www.youtube.com/embed/${mediaIntegrations.videoId}`} 
                            title="YouTube Travel" 
                            allowFullScreen>
                          </iframe>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-12 shadow-inner border border-slate-700/30 flex flex-col items-center justify-center text-slate-500 h-full min-h-[300px] border-dashed fade-in-up fade-in-up-delay-2">
                  <Sun className="w-16 h-16 mb-4 opacity-20 spin-slow" />
                  <p className="font-medium">Enter a location to discover the weather</p>
                  <p className="text-xs mt-2 text-slate-600">Supports city names, zip codes, and GPS coordinates (lat,lon)</p>
                </div>
              )}
            </section>
          </div>
        ) : (
          <div className="bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-700/50 w-full fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <History className="w-5 h-5 text-blue-400" /> Search History (CRUD)
              </h2>
              <div className="flex gap-2">
                <button onClick={() => exportData('json')} className="btn-press flex items-center gap-2 px-3 py-1.5 bg-slate-700/80 hover:bg-slate-600 rounded-lg text-sm transition-all hover:shadow-md">
                  <Download className="w-4 h-4"/> JSON
                </button>
                <button onClick={() => exportData('csv')} className="btn-press flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm transition-all hover:shadow-md hover:shadow-emerald-500/20">
                  <Download className="w-4 h-4"/> CSV
                </button>
              </div>
            </div>
            
            {history.length === 0 ? (
               <p className="text-slate-500 text-center py-8">No history found. Search for a location first!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-400 text-sm">
                      <th className="pb-3 pr-4 font-medium">Location</th>
                      <th className="pb-3 pr-4 font-medium">Found As</th>
                      <th className="pb-3 pr-4 font-medium">Temp</th>
                      <th className="pb-3 pr-4 font-medium">Notes</th>
                      <th className="pb-3 pr-4 font-medium">Date</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((item, index) => (
                      <tr key={item.id} className="border-b border-slate-700/50 last:border-0 hover:bg-slate-700/20 transition-all duration-200" style={{ animation: `fadeInUp 0.4s ease-out ${index * 0.05}s forwards`, opacity: 0 }}>
                        <td className="py-4 pr-4 font-medium">{item.locationQuery}</td>
                        <td className="py-4 pr-4 text-slate-300">{item.foundLocationName}</td>
                        <td className="py-4 pr-4 font-semibold">{item.temperature != null ? Math.round(item.temperature) : '--'}°C</td>
                        <td className="py-4 pr-4 max-w-[200px]">
                          {editingId === item.id ? (
                            <input 
                              type="text" 
                              value={editNotes}
                              onChange={e => setEditNotes(e.target.value)}
                              className="px-2 py-1 bg-slate-900 rounded border border-blue-500/50 text-sm w-full outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                              placeholder="Add a note..."
                              autoFocus
                            />
                          ) : (
                            <span className="text-sm text-slate-400 italic">{item.notes || '—'}</span>
                          )}
                        </td>
                        <td className="py-4 pr-4 text-sm text-slate-400">{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td className="py-4">
                          <div className="flex gap-1">
                            {editingId === item.id ? (
                              <>
                                <button onClick={() => saveNotes(item.id)} className="btn-press p-2 text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-all">
                                  <Check className="w-4 h-4" />
                                </button>
                                <button onClick={() => setEditingId(null)} className="btn-press p-2 text-slate-400 hover:bg-slate-400/10 rounded-lg transition-all">
                                  <X className="w-4 h-4" />
                                </button>
                              </>
                            ) : (
                              <>
                                <button onClick={() => startEditing(item)} className="btn-press p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all">
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button onClick={() => deleteHistory(item.id)} className="btn-press p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="mt-auto pt-16 text-center max-w-2xl px-4 pb-8 w-full relative z-10 fade-in-up fade-in-up-delay-4">
        {/* Developer Info */}
        <div className="p-4 bg-slate-800/60 backdrop-blur-sm rounded-xl text-sm border border-slate-700/50 mb-4 card-glow">
          <p className="text-slate-200 font-semibold mb-2">José Ignacio Leguizamón — Software Developer</p>
          <div className="flex justify-center gap-4">
            <a href="https://www.linkedin.com/in/ignaciolegui/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-all hover:scale-105">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href="https://github.com/IgnacioLegui" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-all hover:scale-105">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>

        {/* PM Accelerator Info */}
        <details className="bg-slate-800/60 backdrop-blur-sm rounded-xl text-sm border border-slate-700/50 text-left card-glow group">
          <summary className="p-4 cursor-pointer font-semibold text-slate-200 flex items-center gap-2 list-none [&::-webkit-details-marker]:hidden select-none">
            <Info className="w-4 h-4 text-blue-400" /> About Product Manager Accelerator
            <span className="ml-auto text-slate-500 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <div className="px-4 pb-4">
            <p className="text-slate-400 leading-relaxed">
              The Product Manager Accelerator Program is designed to support PM professionals through every stage of their careers. From students looking for entry-level jobs to Directors looking to take on a leadership role, our program has helped over hundreds of students fulfill their career aspirations.
            </p>
            <p className="text-slate-400 leading-relaxed mt-2">
              Our Product Manager Accelerator community are ambitious and committed. Through our program they have learnt, honed and developed new PM and leadership skills, giving them a strong foundation for their future endeavors.
            </p>
            <a href="https://www.linkedin.com/school/pmaccelerator/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-xs mt-3 inline-block transition-all hover:translate-x-1">
              Learn more on LinkedIn →
            </a>
          </div>
        </details>
      </footer>
    </div>
  );
}

export default App;
