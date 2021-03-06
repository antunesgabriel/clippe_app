import {StyleService} from '@ui-kitten/components';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const styles = StyleService.create({
  container: {
    backgroundColor: '#F4F4F4',
    flex: 1,
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  box: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: responsiveHeight(25),
    marginBottom: responsiveHeight(6),
  },
  name: {
    marginLeft: 10,
  },
  form: {
    flex: 1,
    marginHorizontal: 30,
    marginVertical: 25,
  },
  input: {
    marginVertical: 10,
  },
  button: {
    marginVertical: 10,
  },
  bottom: {
    marginTop: 25,
  },
});

export default styles;
