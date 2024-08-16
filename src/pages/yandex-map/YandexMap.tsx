'use client';

import React, { useEffect, useState } from "react";
import { Map, Placemark, Circle } from "@pbe/react-yandex-maps";
import synagogue from "@/pages/yandex-map/synagogue.svg";
import { coordinates } from '@/pages/yandex-map/coordinates';

export const YandexMap = () => {
  const [zoom, setZoom] = useState(14);
  const [iconSideSize, setIconSideSize] = useState(30);
  const [circleCenter, setCircleCenter] = useState<[number, number] | null>(null);
  const [circleRadius, setCircleRadius] = useState<number | null>(null);

  // Изменение зума карты
  const onChangeZoom = (ref: ymaps.Map | null) => {
    ref?.events.add('boundschange', () => {
      setZoom(ref.getZoom());
    });
  };

  // Расчет размера иконки на основе зума
  const countIconSize = (zoom: number) => {
    const baseSize = 30;
    const zoomFactor = 1 + (zoom - 12) * 0.1;
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
          geometry={[[55.749, 37.616], 1690]}
          options={{
            fillColor: "#db709377",
            strokeColor: "#990066",
            strokeOpacity: 0.8,
            strokeWidth: 2,
            draggable: true,
          }}
        />

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
            iconImageOffset: [0, 0],
          }}
        />
      ))}
    </Map>
  );
};
