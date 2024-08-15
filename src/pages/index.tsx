import React, { useRef } from "react";
import {
  YMaps,
  Map,
  Placemark,
} from "@pbe/react-yandex-maps";
import synagogue from "@/img/synagogue.svg";
import mapStyles from '@/styles/customization.json'; 
import { YMapsApi } from "@pbe/react-yandex-maps/typings/util/typing";

const API_KEY = "93c14f3b-3a0a-4938-995e-cad28ae42e46";


interface MyMapComponentProps {
  ymaps: any; // Указываем тип для ymaps
}

export default function Home({ ymaps }: MyMapComponentProps) {
  const ref = useRef();

  const onMapLoad = (mapInstance: any) => {
    if (ymaps) {
      const mapType = new ymaps.MapType("CustomMap", mapStyles);
      mapInstance.setType("CustomMap");
    }
  };

  return (
    <YMaps
      query={{
        load: "package.full",
        apikey: API_KEY
      }}
    >
      <Map
        // instanceRef={ref}
        instanceRef={(ref) => {
          if (ref && ymaps) {
            onMapLoad(ref);
          }
        }}
        state={{
          center: [55.752004, 37.617734],
          zoom: 9,
          controls: ["zoomControl"],
          type: "yandex#map"
        }}
        width="100vw"
        height="100vh"
        modules={["control.ZoomControl"]}
      >
        <Placemark
          geometry={[55.684758, 37.738521]}
          properties={{
            balloonContent: 'Метка на карте', // Содержимое балуна
            hintContent: 'Подсказка при наведении', // Содержимое подсказки
          }}
          options={{
            iconLayout: 'default#image',
            iconImageHref: synagogue.src, // Путь к изображению метки
            iconImageSize: [30, 42], // Размер иконки
            iconImageOffset: [-15, -42], // Смещение иконки
          }}
        />
      </Map>
    </YMaps>
  );
}







// import React from "react";
// import {
//   YMap,
//   YMapDefaultSchemeLayer,
//   YMapDefaultFeaturesLayer,
//   YMapComponentsProvider,
//   YMapDefaultMarker,
// } from "ymap3-components";

// import styles from '@/styles/Home.module.css';

// export default function Home() {
//   const location = { center: [55.752004, 37.617734], zoom: 12 };

//   return (
//     <>
//       <h1>1234</h1>
//       <YMapComponentsProvider apiKey={API_KEY}>
//         <YMap location={location} className={styles.map}>
//           <YMapDefaultSchemeLayer />
//           <YMapDefaultFeaturesLayer />
//           <YMapDefaultMarker
//             source={'./synagogue.svg'}
//             coordinates={[55.752004, 37.617734]}
//           />
//         </YMap>
//       </YMapComponentsProvider>
//     </>
//   );
// }
