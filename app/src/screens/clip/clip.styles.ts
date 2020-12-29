import {StyleService} from '@ui-kitten/components';

const styles = StyleService.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F4F4F4',
  },

  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconWrapper: {
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  text: {
    marginVertical: 20,
    textAlign: 'center',
  },

  content: {
    minHeight: 100,
  },

  margin: {
    marginVertical: 10,
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },

  button: {
    marginRight: 15,
  },
});

export default styles;
