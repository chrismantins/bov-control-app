import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';
import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components/native';

// import { Container } from './styles';

interface SelectProps extends PickerSelectProps {
  items: { label: string; value: string }[];
}

const Select = ({ items, ...props }: SelectProps) => {
  return (
    <Container>
      <RNPickerSelect
        style={pickerSelectStyles}
        items={items}
        {...props}
        Icon={() => {
          return (
            <Ionicons name='chevron-down-outline' size={30} color='#11AFFD' />
          );
        }}
      />
    </Container>
  );
};

const Container = styled.View`
  border-radius: 20px;
  margin-bottom: 16px;
`;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: '#F4F4F4',
    height: 50,
    borderRadius: 10,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#13131a',
  },
  inputAndroid: {
    backgroundColor: '#F4F4F4',
    height: 50,
    borderRadius: 10,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#13131a',
  },
  placeholder: {
    color: '#AAAAAA',
  },
  iconContainer: {
    top: 10,
    right: 15,
  },
});

export { Select };
