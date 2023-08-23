import { styled } from 'styled-components';

import { colors } from '../utils/constants';

const Section = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: ${props => props.$active ? '1rem' : '1.5rem'};
	flex-grow: ${props => props.$active ? '0.25' : '0.5'};
`;

const Button = styled.button`
	color: ${colors.white};
	padding: 1rem;
	border: 0;
	border-bottom: 1px solid transparent;
	text-transform: uppercase;
	font-weight: 600;
	width: auto;
	min-width: 20rem;
	cursor: pointer;
	box-shadow: 0 5px 10px rgba(0,0,0,0.1);
	transition: all 0.2s;

	&:hover {
		box-shadow: 0 10px 20px rgba(0,0,0,0.3);
		border-color: ${colors.white};
	}
`;

const UploadButton = styled(Button)`
	background-color: ${colors.primary};
	padding: ${props => props.$active ? '1rem' : '1.5rem'};
	position: relative;
	overflow-x: hidden;
`;

const Upload = styled.input`
	width: 155%;
	height: 100%;
	left: -55%;
	top: 0;
	position: absolute;
`;

const Text = styled.p`
	font-size: 1rem;
	text-transform: uppercase;
`;

const PasteButton = styled(Button)`
	background-color: ${colors.darkerGray};
	padding: ${props => props.$active ? '1rem' : '1.5rem'};
`;

const Label = styled.label`
	display: flex;
	gap: 1rem;
	display: flex;
	justify-content: center;
	margin-top: 1rem;
	color: ${colors.darkGray};
`;

const LabelText = styled.span`
	text-transform: capitalize;
`;

const CheckboxContainer = styled.div`
	position: relative;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  background: ${props => props.checked ? colors.primary : colors.darkGray };
  border-radius: 0;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px ${colors.primary};
  }

  ${Icon} {
    visibility: ${props => props.checked ? 'visible' : 'hidden'};
  }
`;

const PasteBoxArea = styled.div`
	position: relative;
`;

const PasteBox = styled.textarea`
	padding: 1rem;
	width: 30rem;
	height: 20rem;
	margin-top: 2rem;
	box-shadow: 0 5px 10px rgba(0,0,0,0.1);
	border: 1px solid ${colors.lightestGray};
	transition: all 0.2s;
	font-size: 1rem;

	&:focus {
		outline: 0;
		border-color: ${colors.lighterGray};
	}
`;

const PasteConfirmButton = styled(Button)`
	position: absolute;
	bottom: 1rem;
	right: 1rem;
	background-color: ${colors.primary};
	min-width: auto;
	padding: 0.75rem 1rem;
	font-size: 0.875rem;
	text-transform: capitalize;

	&:hover {
		box-shadow: 0 10px 20px rgba(0,0,0,0.2);
	}
`;

export {
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
};