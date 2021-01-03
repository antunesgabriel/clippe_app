import {StyleService} from '@ui-kitten/components';

export const styles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  safeArea: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    marginTop: 30,
    marginBottom: 12,
    textAlign: 'center',
  },

  describe: {
    marginBottom: 5,
    textAlign: 'center',
  },

  button: {
    marginTop: 20,

    alignSelf: 'stretch',
  },
});
