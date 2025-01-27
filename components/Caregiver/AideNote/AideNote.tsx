// * Third Party
import { Label, Radio } from "flowbite-react";

// * Helpers
import { AideNotePropType } from "@/types";

// * CSS
import "./style.css";

const AideNote = (props: AideNotePropType) => {
  return (
    <>
      <div className="mt-6">
        {props.title && <h5 className="text-2xl text-gray-700 bg-gray-100 border-b mb-2 border-gray-300 pt-3 p-1 capitalize ">{props.title}</h5>}
        <p className="text-xl text-sky-700 my-2">Task </p>
        <p>
          <span className="font-semibold capitalize"> {props.taskTitleMain} </span> - {props.taskTitleSub && <span>{props.taskTitleSub}</span>}
          <span className="italic capitalize">({props.taskTitleFrequency})</span>
        </p>

        <p className="text-xl text-sky-700 my-3 mb-2">Special Notes</p>
        <p>{props.specialNotes.note ? props.specialNotes.note : "ADA"}</p>

        <p className="text-xl text-sky-700 my-3 mt-6 required-mark">Completion status</p>
        <div className={`flex flex-wrap gap-2 radio-btn-container items-center`}>
          <div className="flex gap-1 items-center">
            <Radio id={`${props.class}__completed`} value={`${props.class}__completed`} {...props.register(`${props.class}`)} />
            <Label className="capitalize" htmlFor={`${props.class}__completed`}>
              Completed
            </Label>
          </div>
          <div className="flex gap-1 items-center">
            <Radio id={`${props.class}__refused`} value={`${props.class}__refused`} {...props.register(`${props.class}`)} />
            <Label className="capitalize" htmlFor={`${props.class}__refused`}>
              Patient Refused
            </Label>
          </div>
          <div className="flex gap-1 items-center">
            <Radio id={`${props.class}__na`} value={`${props.class}__na`} {...props.register(`${props.class}`)} />
            <Label className="capitalize" htmlFor={`${props.class}__na`}>
              N/A
            </Label>
          </div>
          <div className="flex gap-1 items-center">
            <Radio id={`${props.class}__not_completed`} value={`${props.class}__not_completed`} {...props.register(`${props.class}`)} />
            <Label className="capitalize" htmlFor={`${props.class}__not_completed`}>
              Not Completed
            </Label>
          </div>
        </div>
        {props.errors[`${props.class}`] && <div className="text-red-500 mt-1 mb-2">Please select completion status</div>}
        <p className="text-xl text-sky-700 my-4">Comments</p>
        <textarea className="w-full border-gray-300"></textarea>
      </div>
    </>
  );
};

export default AideNote;
