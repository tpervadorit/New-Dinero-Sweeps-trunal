import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarIcon,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import useAvatar from '../../hooks/useAvatar';
import Image from 'next/image';
import { headPortrait } from '@/assets/png';
import CustomToast from '@/common/components/custom-toaster';

const Avatar = () => {
  const {
    onSubmit,
    setFile,
    file,
    user,
    message,
    setShowToast,
    showToast,
    status,
    loading,
    sizeError,
    setSizeError,
  } = useAvatar();
  const { profileImage, firstName, lastName, userId } = user || {};

  const handleChange = (e) => {
    const selectedFile = e?.target?.files[0];
    if (selectedFile && selectedFile?.size > 2 * 1024 * 1024) {
      setSizeError('File size must be less than 2MB!');
      setFile(null);
    } else {
      setSizeError('');
      setFile(selectedFile);
    }
  };

  // if (userLoading) return <>...Loading</>;
  return (
    <section className="rounded">
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex items-center justify-center gap-5 py-4">
            <div>
              <AvatarIcon className="h-20 w-20">
                <AvatarImage src={profileImage} alt="avatar" />
                <AvatarFallback>
                  <Image
                    src={headPortrait}
                    alt="profileImage"
                    width={80}
                    height={80}
                  />
                </AvatarFallback>
              </AvatarIcon>
            </div>
            <div>
              <div className="text-primary-foreground text-2xl font-bold mb-1">
                {firstName} {lastName}
              </div>
              <div className="text-primary-foreground text-base font-bold mb-1.5">
                ID: {userId}
              </div>
              <div className="text-gray-200 text-sm font-semibold mb-1">
                JPG or PNG
                <br />
                Max File Size 2MB
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-center gap-4 py-6">
            <div className="flex">
              <input
                id="upload"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleChange}
                className="hidden"
              />
              <label
                htmlFor="upload"
                className="cursor-pointer w-52 px-4 py-2 max-w-52 font-semibold text-black bg-yellow-400 hover:bg-yellow-500 rounded-full text-base truncate text-center"
              >
                {file ? (
                  <>
                    Selected <span className="underline">{file.name}</span>
                  </>
                ) : (
                  'Choose File'
                )}
              </label>
            </div>
            <Button
              type="submit"
              disabled={!file || loading || sizeError}
              loading={loading}
              className={`bg-red-500 text-base w-52 px-4 !py-5 rounded-full text-white hover:bg-red-600 ${!file || loading || sizeError ? 'cursor-not-allowed' : 'cursor-pointer'} `}
            >
              Update
            </Button>
          </div>
        </div>
      </form>
      <CustomToast
        message={message}
        setShowToast={setShowToast}
        showToast={showToast}
        status={status}
      />
    </section>
  );
};
export default Avatar;
