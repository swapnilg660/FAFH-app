<Select
  selectedValue={gender}
  minWidth="200"
  accessibilityLabel="Choose your gender"
  placeholder="Choose your Gender"
  _selectedItem={{
    bg: "primary.100",
    endIcon: <CheckIcon size={5} />,
    borderRadius: "20",
  }}
  mt={1}
  onValueChange={(itemValue) => setFieldValue("gender", itemValue)}
>
  <Select.Item label="Male" value="M" />
  <Select.Item label="Female" value="F" />
</Select>;
