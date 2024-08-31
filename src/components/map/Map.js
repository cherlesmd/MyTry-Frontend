import React, { useRef, useEffect, useState } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = ({ lng, setLng, lat, setLat, tries }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom, setZoom] = useState(13);

    useEffect(() => {
        if (map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [lng, lat],
            zoom: zoom,
        });

        map.current.on("move", () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });

        console.log(tries);
        for (const feature of tries) {
            new mapboxgl.Marker({
                color: "#a3ee59",
                draggable: false,
            })
                .setLngLat(feature.location.coordinates)
                .setPopup(new mapboxgl.Popup().setHTML(`<h3>${feature.name}</h3>`))
                .addTo(map.current);
        }
    }, [zoom, lng, lat, setLng, setLat, tries]);

    return (
        <div>
            <div ref={mapContainer} className="size-full" />
        </div>
    );
};
export default Map;
