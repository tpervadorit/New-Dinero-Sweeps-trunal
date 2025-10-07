import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useBonusDrop from '../../hooks/useBonusDrop';
import CustomToast from '@/common/components/custom-toaster';
import { Controller } from 'react-hook-form';

const BonusDrop = () => {
  const {
    loading,
    control,
    handleSubmit,
    message,
    onSubmit,
    setShowToast,
    showToast,
    status,
  } = useBonusDrop();
  return (
    <section className="rounded">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <div className="mb-2">
            <div className="text-white font-bold mb-2.5">
              Code <span className="text-red-500">*</span>
            </div>
            <Controller
              name="code"
              control={control}
              rules={{ required: 'bonus drop is required' }}
              render={({ field, fieldState }) => {
                const error = fieldState?.error;
                return (
                  <>
                    <Input
                      {...field}
                      placeholder="Enter Code"
                      className="bg-neutral-800 w-full"
                    />
                    {error && (
                      <div
                        className={`text-red-500 text-sm absolute transition-opacity duration-300 ease-in-out ${
                          error
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-2'
                        }`}
                      >
                        {error?.message}
                      </div>
                    )}
                  </>
                );
              }}
            />
          </div>
        </div>
        <div className="mt-0 p-4 flex justify-center">
          <Button
            loading={loading}
            disabled={loading}
            className="bg-red-500 py-2  text-white rounded-full hover:bg-red-600"
          >
            Submit
          </Button>
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
export default BonusDrop;
