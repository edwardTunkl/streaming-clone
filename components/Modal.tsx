import MuiModal from '@mui/material/Modal';
import { modalState } from '../atoms/modalAtoms';
import { useRecoilState } from 'recoil';
import useMovies from '../hooks/useMovies';
import ModalFoot from './ModalFoot';
import { XIcon } from '@heroicons/react/outline';
import ModalPlayer from './ModalPlayer';

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const { trailer, genres } = useMovies();

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className='fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide '
    >
      <>
        <button
          onClick={handleClose}
          className='modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]'
        >
          <XIcon className='h-6 w-6' />
        </button>
        <ModalPlayer trailer={trailer} />
        <ModalFoot genres={genres} />
      </>
    </MuiModal>
  );
}

export default Modal;
