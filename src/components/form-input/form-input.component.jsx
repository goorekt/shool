import { FormInputLabel, Input, Group } from "./form-input.styles";

const FormInput = ({ label, ...otherProps }) => {
	return (
		<Group>
			<Input {...otherProps} />
			{label && (
				<FormInputLabel shrink={otherProps.value.length} additionalTypes={otherProps.additionalTypes}>
					{label}
				</FormInputLabel>
			)}
		</Group>
	);
};

export default FormInput;
