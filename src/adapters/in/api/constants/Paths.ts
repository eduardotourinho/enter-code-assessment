/**
 * Express router paths go here.
 */

import { Immutable } from '@src/types/immutable';


const Paths = {
  Base: '/api',
  Forms: {
    Base: '/forms',
    Get: '',
    GetForm: '/:id',
    Add: '',
    Answer: '/:id/answer',
  },
};


export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
