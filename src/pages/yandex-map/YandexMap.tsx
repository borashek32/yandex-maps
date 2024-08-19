'use client';

import React, { useEffect, useState } from "react";
import { Map, Placemark, Circle } from "@pbe/react-yandex-maps";
import synagogue from "@/assets/img/synagogue.svg";
import synagogueHover from "@/assets/img/synagogue-hover.svg";
import { coordinates } from '@/assets/data/yandex-map/coordinates';

export const YandexMap = () => {
  const [zoom, setZoom] = useState(14);
  const [iconSideSize, setIconSideSize] = useState(30);

  // change zoom and set it
  const onChangeZoom = (ref: ymaps.Map | null) => {
    ref?.events.add('boundschange', () => {
      setZoom(ref.getZoom());
    });
  };

  // calculate icon image size
  // depends on zoom
  const countIconSize = (zoom: number) => {
    const baseSize = 30;
    const zoomFactor = 1 + (zoom - 4) * 0.1;
    const maxSize = 60;
    const newIconSideSize = Math.min(baseSize * zoomFactor, maxSize);
    setIconSideSize(newIconSideSize);
  };

  useEffect(() => {
    countIconSize(zoom);
  }, [zoom]);

  return (
    <Map
      instanceRef={(ref) => {
        onChangeZoom(ref);
      }}
      state={{
        center: [55.752004, 37.617734],
        zoom: zoom,
        controls: ["zoomControl"],
        type: "yandex#map"
      }}
      width="100vw"
      height="100vh"
      modules={["control.ZoomControl"]}
      
    >
      <Circle
        geometry={[[55.7493, 37.6165], 1690]}
        options={{
          fillColor: "#db709377",
          strokeColor: "#990066",
          strokeOpacity: 0.8,
          strokeWidth: 2,
        }}
      />

      {coordinates.map((item, index) => (
        <Placemark
          key={index}
          geometry={item}
          properties={{
            balloonContent: `Синагога ${index + 1}`,
            hintContent: `Подсказка для синагоги ${index + 1}`,
          }}
          options={{
            iconLayout: 'default#image',
            iconImageHref: synagogue.src,
            iconImageSize: [iconSideSize, iconSideSize],
            iconImageOffset: [0, 0],
          }}
          modules={['geoObject.addon.hint', 'geoObject.addon.balloon']}
          onMouseEnter={(e: any) => {
            const target = e.get('target');
            target.options.set('iconImageHref', synagogueHover.src);
          }}
          onMouseLeave={(e: any) => {
            const target = e.get('target');
            target.options.set('iconImageHref', synagogue.src);
          }}
          onClick={(e: any) => {
            const target = e.get('target');
            target.options.set('iconImageHref', synagogueHover.src);
          }}
        />
      ))}
    </Map>
  );
};
