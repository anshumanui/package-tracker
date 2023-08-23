import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Section, 
  UploadButton, 
  Upload, 
  Text, 
  PasteButton, 
  Label,
  LabelText,
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  Icon, 
  PasteBoxArea, 
  PasteBox, 
  PasteConfirmButton 
} from '../assets/App.styled';

const Checkbox = ({ checked, ...props }) => {
  return (
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  )
}


function App() {
  const navigate = useNavigate();
  const [pasteBoxActive, setPasteBoxActive] = useState(false);
  const [pasteBoxData, setPasteBoxData] = useState('');
  const [trackerStatus, setTrackerStatus] = useState(false);

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
    navigate('/comparison', { 
      state: ({ 
        trackerStatus: trackerStatus, 
        fileData: fileData ? fileData : pasteBoxData
      })
    });
  };

  return (
    <Section $active={ pasteBoxActive }>
      <UploadButton $active={ pasteBoxActive }>
        Upload package.json
        <Upload type="file" accept="application/json" onChange={ (event) => parseFileData(event.target.files[0]) } />
      </UploadButton>
      <Text>Or</Text>
      <PasteButton $active={ pasteBoxActive } onClick={ () => setPasteBoxActive(true) }>Copy Paste package.json</PasteButton>
      <Label>
        <Checkbox
          checked={ trackerStatus }
          onChange={ () => setTrackerStatus(prevData => !prevData) }
        />
        <LabelText>track dev dependencies</LabelText>
      </Label>
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
