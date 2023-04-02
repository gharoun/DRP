import { useEffect, useState } from "react";
import { apiHospitality } from "services/api-client";

interface Data {
  name: string;
  geo_description: string;
  _id: number;
  location_string: string;
  num_reviews: string;
  photo: {
    images: {
      medium: {
        url: string;
      };
    };
  };
}

interface Hospitality {
  result_object: Data;
}
const useData = () => {
  const [hospitality, setHospitality] = useState<Hospitality[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    apiHospitality
      .get("/search", { signal: controller.signal })
      .then((res) => {
        setHospitality(res.data.data);
        console.log("setHospitality", res.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    return () => controller.abort();
  }, []);

  const ipaData = hospitality.map((item, index) => {
    return {
      title: item.result_object.name,
      description: item.result_object.geo_description,
      _id: index + 5000,
      location: item.result_object.location_string,
      price: item.result_object.num_reviews,
      photo: item.result_object.photo.images.medium.url,
    };
  });
  return ipaData;
};
export default useData;
