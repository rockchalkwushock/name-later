import assert from 'assert';
import Auth from '../server/modules/Auth/model';

describe('Create Auth User by local login', () => {
  it('Saves an Auth User to MongoDB', (done) => {
    const user = new Auth({
      local: {
        email: 'billSelf2017@ku.edu',
        password: '12dOWn13Next'
      }
    });

    user.save()
        .then(() => {
          assert(!user.isNew);
          done();
        });
  });
});
