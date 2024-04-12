import React, { useState } from "react";

import s from "@/styles/partials/Map.module.scss";
import ModalMap from "./ModalMap";

const steps = [
    {
      id: 1,
      title: "Россия",
      description: "Москва",
    },
    {
        id: 2,
        title: "Россия",
        description: "Москва",
      },
      {
        id: 3,
        title: "Россия",
        description: "Москва",
      },
      {
        id: 4,
        title: "Россия",
        description: "Москва",
      },
]

export default function Map () {
    const [openStepId, setOpenStepId] = useState(null);

    const toggleModal = (stepId) => {
        setOpenStepId(openStepId === stepId ? null : stepId);
    };

    const Mapgps = () => (
        <svg width="21" height="27" viewBox="0 0 21 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.989" fillRule="evenodd" clipRule="evenodd" d="M9.47157 -0.0263672C10.1396 -0.0263672 10.8075 -0.0263672 11.4755 -0.0263672C15.2264 0.516598 17.907 2.50293 19.5175 5.93262C20.2796 7.83116 20.4554 9.78233 20.0448 11.7861C19.5149 13.8853 18.7064 15.8717 17.619 17.7451C15.8961 20.6982 13.9274 23.4756 11.7128 26.0771C11.4456 26.4236 11.138 26.7224 10.7899 26.9736C10.579 26.9736 10.3681 26.9736 10.1571 26.9736C9.80907 26.7224 9.50147 26.4236 9.23427 26.0771C7.01969 23.4756 5.0509 20.6982 3.32802 17.7451C2.24068 15.8717 1.43209 13.8853 0.902237 11.7861C0.219728 7.94169 1.33594 4.7337 4.25087 2.16211C5.78328 0.938925 7.52351 0.209432 9.47157 -0.0263672ZM9.84071 4.87793C12.0004 4.74039 13.644 5.58415 14.7714 7.40918C15.8011 9.64306 15.4583 11.6382 13.7431 13.3945C12.0011 14.8027 10.1202 15.0136 8.10048 14.0273C6.13544 12.7771 5.33562 10.9929 5.70106 8.6748C6.30181 6.5533 7.68172 5.28768 9.84071 4.87793Z" fill="#FF7C00"/>
        </svg>
    );

    return (
        <div className={s.step}>
            <img className={s.step_img} src="assets/icons/map.svg" alt="OWAY USA MAP" />
            {steps.map((step) => (
                <div key={step.id} className={s[`step_blocks${step.id}`]}>
                    <span className={s.step_span} onClick={() => toggleModal(step.id)}><Mapgps/>
                    {openStepId === step.id && <ModalMap description={step.description} stepId={step.id} title={step.title} onClose={() => toggleModal(null)} />} 
                    </span>
                    <div className={s.step_blocks}></div>{/* не трогай этот div котун туйрум*/}
                </div>
            ))}
        </div>
    );
}
