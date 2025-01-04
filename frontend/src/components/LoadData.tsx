import { observer } from "mobx-react-lite";
import { Stack } from "react-bootstrap";
import { GenerateRandomData } from "./GenerateRandomData";
import { GenerateDataFromFile } from "./GenerateDataFromFile";

export const LoadData = observer(() => {
  return (
    <div className='flex-col h-full w-full m-0'>
      <h3 className='mx-[3rem] mt-[2rem]'>Load Data</h3>
      <Stack className='flex-grow w-full '>
        <GenerateRandomData/>
        <span className='border-t border-gray-200 w-full'/>
        <GenerateDataFromFile/>
      </Stack>
    </div>
  );
});
