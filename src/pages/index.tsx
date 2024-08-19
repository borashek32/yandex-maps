'use client';

import React from "react";
import { YMaps } from "@pbe/react-yandex-maps";
import { YandexMap } from "./yandex-map/YandexMap";

const API_KEY = process.env.YANDEX_MAPS_API_KEY;

export default function Home() {
  
  return (
    <YMaps 
      query={{
        load: "package.full",
        apikey: API_KEY,
        mode: "debug",
      }}
    >
      <YandexMap />
    </YMaps>
  );
}
