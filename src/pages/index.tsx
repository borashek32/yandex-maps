'use client';

import React from "react";
import { YMaps } from "@pbe/react-yandex-maps";
import { YandexMap } from "./yandex-map/YandexMap";

const API_KEY = "93c14f3b-3a0a-4938-995e-cad28ae42e46";

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
