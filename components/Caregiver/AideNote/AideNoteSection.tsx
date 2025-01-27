import React from "react";

// * Third Party
import { Label, Radio } from "flowbite-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// * Custom Components
import AideNote from "./AideNote";

import { aideNotesTopics } from "@/helpers/constants";

// * Helpers
import { AideNoteFormDataType, AideNoteSectionPropType, classNameType } from "@/types";

const schema = yup.object().shape({
  [`nutrition-hydration--1`]: yup.string().required(),
  [`nutrition-hydration--2`]: yup.string().required(),
  [`house-keeping--1`]: yup.string().required(),
  [`house-keeping--2`]: yup.string().required(),
  [`custom-tasks--1`]: yup.string().required(),
});

const AideNoteSection = (props: AideNoteSectionPropType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: AideNoteFormDataType) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="user-info px-4 mt-8 mb-4">
        <div className="user-info__name text-2xl text-sky-700 mb-2">USERNAME</div>
        <div className="user-info__main border bg-gray-100 border-gray-300 py-4 px-3">
          <p className="user-info--pan text-black font-medium mb-2">
            <span className="text-gray-700">PAN:</span> 78589657
          </p>
          <p className="user-info--admit_date text-black font-medium">
            <span className="text-gray-700">Admit Date:</span> 02/02/2022
          </p>
        </div>
      </div>
      <div className="mb-4">
        <h5 className="text-2xl text-gray-700 bg-gray-100 border-b mb-2 border-gray-300 pt-3 p-1">Special Instructions</h5>
        <p className="border-l-4 border-sky-700 border-t-1 border-gray-300 px-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia, animi.</p>
      </div>
      {aideNotesTopics.map((currAideNoteTopic, index) => {
        return <AideNote register={register} errors={errors} key={index} title={currAideNoteTopic.title} taskTitleMain={currAideNoteTopic.taskTitleMain} taskTitleSub={currAideNoteTopic.taskTitleSub} taskTitleFrequency={currAideNoteTopic.taskTitleFrequency} class={currAideNoteTopic.class as classNameType} specialNotes={currAideNoteTopic.specialNotes} />;
      })}
      <div>
        <h5 className="text-2xl text-gray-700 bg-gray-100 border-b mb-2 border-gray-300 pt-3 p-1 capitalize mt-6">QA status</h5>
        <div className="flex flex-wrap gap-2 items-center radio-btn-container">
          <div className="flex gap-1 items-center">
            <Radio id={`qa-status__completed`} value={`qa-status__completed`} />
            <Label className="capitalize" htmlFor={`qa-status__completed`}>
              Completed
            </Label>
          </div>
          <div className="flex gap-1 items-center">
            <Radio id={`qa-status__inuse`} value={`qa-status__inuse`} />
            <Label className="capitalize" htmlFor={`qa-status__inuse`}>
              In Use
            </Label>
          </div>
          <div className="flex gap-1 items-center">
            <Radio id={`qa-status__reason`} value={`qa-status__reason`} />
            <Label className="capitalize" htmlFor={`qa-status__reason`}>
              Return for correction
            </Label>
          </div>
          <div className="flex gap-1 items-center">
            <Radio id={`qa-status__approved`} value={`qa-status__approved`} />
            <Label className="capitalize" htmlFor={`qa-status__approved`}>
              Approved
            </Label>
          </div>
        </div>
        <p className="text-xl text-sky-700 my-4">Comments</p>
        <textarea className="w-full border-gray-300"></textarea>
      </div>
      <div className="flex justify-end gap-1 mt-6">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded capitalize">Save & Close</button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded capitalize" onClick={props.childCloseHandler}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AideNoteSection;
