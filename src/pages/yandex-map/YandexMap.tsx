'use client';

import React, { useEffect, useState } from "react";
import { Map, Placemark } from "@pbe/react-yandex-maps";
import synagogue from "@/pages/yandex-map/synagogue.svg";
import { coordinates } from '@/pages/yandex-map/coordinates';

export const YandexMap = () => {
  const [zoom, setZoom] = useState(10);
  const [iconSideSize, setIconSideSize] = useState(30);

  // 1 icon size
  // get zoom when user changes it 
  // and set it to variable "zoom"
  const onChangeZoom = (ref: ymaps.Map | null) => {
    ref?.events.add('boundschange', () => {
      // @ts-expect-error: Property 'zoom' does not exist on type 'object'.ts(2339)
      setZoom(ref.action.getCurrentState().zoom);
    })
  }

  // 2 icon size
  // count img size for icons for marks on map
  // depends on map zoom
  const countIconSize = (zoom: number) => {
    const baseSize = 30;
    const zoomFactor = 1 + (zoom - 12) * 0.1;
    const maxSize = 60;
    const newIconSideSize = Math.min(baseSize * zoomFactor, maxSize);
    setIconSideSize(newIconSideSize);
  }

  useEffect(() => {
    countIconSize(zoom)
  }, [zoom])



  
  return (
    <Map
      instanceRef={ref => {
        onChangeZoom(ref)
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
      {coordinates.map((coord, index) => (
        <Placemark
          key={index}
          geometry={coord}
          properties={{
            balloonContent: `Метка ${index + 1}`,
            hintContent: `Подсказка ${index + 1}`,
          }}
          options={{
            iconLayout: 'default#image',
            iconImageHref: synagogue.src,
            iconImageSize: [iconSideSize, iconSideSize],
            iconImageOffset: [10, 10],
          }}
        />
      ))}
    </Map>
  );
};
