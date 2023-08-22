import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section, UploadButton, Upload, Text, PasteButton, PasteBoxArea, PasteBox, PasteConfirmButton } from '../assets/App.styled';



function App() {
  const navigate = useNavigate();
  const [pasteBoxActive, setPasteBoxActive] = useState(false);
  const [pasteBoxData, setPasteBoxData] = useState('');

  const parseFileData = (uploadedFile) => {
    const fileReader = new FileReader();
    fileReader.onloadend = async () => {
      try {
        const fileData = await fileReader.result;
        trackVersions(fileData);
        //setErrorData(null)
      } catch(e){
        //setErrorData("**Not valid JSON file!**");
      }
    }
    if (uploadedFile !== undefined) {
      fileReader.readAsText(uploadedFile);
    }
  }

  const trackVersions = (fileData) => {
    navigate('/comparison', { state: (fileData ? fileData : pasteBoxData) });
  };

  return (
    <Section $active={ pasteBoxActive }>
      <UploadButton $active={ pasteBoxActive }>
        Upload package.json
        <Upload type="file" accept="application/json" onChange={ (event) => parseFileData(event.target.files[0]) } />
      </UploadButton>
      <Text>Or</Text>
      <PasteButton $active={ pasteBoxActive } onClick={ () => setPasteBoxActive(true) }>Copy Paste package.json</PasteButton>
      {
        pasteBoxActive && (
          <PasteBoxArea>
            <PasteBox value={ pasteBoxData } onChange={ (event) => setPasteBoxData(event.target.value)}>
            </PasteBox>
            { 
              pasteBoxData && (
                <PasteConfirmButton onClick={ () => trackVersions() }>Track Versions</PasteConfirmButton>
              )
            }
          </PasteBoxArea>
        )
      }
    </Section>
  );
}

export default App;
