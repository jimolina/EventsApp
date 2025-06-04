import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for icons not appearing correctly in some environments:
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [events, setEvents] = useState([]);
  const [mapEventTitle, setMapEventTitle] = useState("");
  const [mapEventLat, setMapEventLat] = useState("");
  const [mapEventLng, setMapEventLng] = useState("");


  useEffect(() => {
    fetch('http://localhost:3000/events') 
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener eventos');
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleMapClick = (event) => {
    setMapEventTitle(event.title);
    setMapEventLat(event.lat);
    setMapEventLng(event.lng);
  }

  const handleMapClose = () => {
    setMapEventTitle("");
    setMapEventLat("");
    setMapEventLng("");
  }

  const mapVisibility = mapEventTitle ? 'opacity-100 scale-100 z-5' : 'opacity-0 scale-95 pointer-events-none';

  return (
    <div className="min-h-screen min-w-[320px] rounded-xl font-mono flex flex-col">
      <header className="bg-gray-500 text-white p-4 text-xl font-bold">
        Events App - Saltstrong.com Test
      </header>

      <main className="flex-1 m-6 p-4 border border-stone-300 rounded-xl bg-stone-200 flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">Welcome</h1>
        <p className="text-lg">
          This is a Test from Saltstrong.com as part of the interview process.
        </p>
        <button
          className="cursor-pointer bg-blue-400 hover:bg-blue-500 p-2 rounded-xl text-white self-end" 
        >
          Add Event
        </button>
        <div className="events-list">
          {loading && <p>Loading Events...</p>}
          {error && <p className="text-red-600">Error: {error}</p>}
          {!loading && !error && (
            <ul className="list-none">
              {events.map((event) => (
                <li key={event.id} className="mb-2 p-2 bg-white rounded shadow flex flex-col gap-2">
                  <h2 className="font-bold text-xl">{event.title}</h2>
                  <p>{event.description}</p>
                  <button
                    className="cursor-pointer bg-blue-400 hover:bg-blue-500 p-2 rounded-xl text-white"
                    onClick={() => handleMapClick(event)}  
                  >
                    See Map
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Start Map Area */}
        <div className={`map-group w-full min-w-[320px] h-full bg-sky-500/30 absolute top-0 left-0 transition-all duration-300 transform p-4 -z-1 ${mapVisibility}`}>
          <div className="container mx-auto md:max-w-[70%] h-full bg-white rounded-lg shadow-lg p-4 flex flex-col gap-1 justify-center">
            <button
              className="cursor-pointer bg-blue-400 hover:bg-blue-500 px-2 py-1 rounded text-sm text-white self-end"
              onClick={() => handleMapClose()}  
            >
              x
            </button>
            <h2 className="font-bold text-xl">{mapEventTitle} - Map</h2>
            <p className="text-sm text-gray-500">{mapEventLat}; {mapEventLng}</p>
            <div className='map w-full h-full'>
              {mapEventLat && mapEventLng && (
                <MapContainer
                  center={[parseFloat(mapEventLat), parseFloat(mapEventLng)]}
                  zoom={13}
                  scrollWheelZoom={false}
                  className="w-full h-full rounded"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  <Marker position={[parseFloat(mapEventLat), parseFloat(mapEventLng)]}>
                    <Popup>{mapEventTitle}</Popup>
                  </Marker>
                </MapContainer>
              )}
            </div>
          </div>
        </div>
        {/* End Map Area */}
        {/* Start Add Event Area */}
        <div></div>
        {/* End Add Event Area */}
      </main>

      <footer className="bg-gray-500 text-white p-4 text-center">
        © 2025 - By <a href="https://josemolinaresume.com/" target="_Blank" className="underline">Jose Molina</a>
      </footer>
    </div>
  )
}
