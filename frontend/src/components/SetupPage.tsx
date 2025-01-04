import { observer } from "mobx-react-lite";
import { ParameterForm } from "./ParameterForm";

export const SetupPage = observer(() => {
  return (
    <div className='m-[3rem] mt-[2rem]'>
      <h3 className='mb-4'>Setup</h3>
      <ParameterForm/>
    </div>
  );
});
