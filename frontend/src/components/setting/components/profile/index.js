import { Button } from '@/components/ui/button';
import CustomToast from '@/common/components/custom-toaster';
import { ELEMENT } from '@/common/form-control';
import { Controller } from 'react-hook-form';
import useBasicInformation from '../../hooks/useBasicInformation';
const Profile = () => {
  const {
    control,
    handleSubmit,
    onSubmit,
    controls,
    userName,
    message,
    setShowToast,
    showToast,
    status,
    loading,
    formatedStateData,
  } = useBasicInformation();

  return (
    <section className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className='text-xl font-bold text-new-primary-foreground'>
          Personal Information
        </h2>
        <div className="text-gray-400 text-sm mb-4">
          (The username and email are the only credentials for login)
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {controls?.map((item) => {
            const Component = ELEMENT[item?.type];
            const isCheckbox = item.type === 'checkbox';
            const isSelect = item.type === 'select';
            const { pattern, required, options } = item;

            if (item.name === 'username') {
              return (
                <div key="dynamic-username" className='flex flex-col gap-1.5'>
                  <label className="text-white font-bold mb-1">
                    User Name
                  </label>
                  <Component
                    value={userName}
                    locked
                    className={`rounded-md w-full text-white bg-neutral-800`}
                  />
                </div>
              );
            }

            return (
              <Controller
                key={item.name}
                control={control}
                name={item.name}
                rules={{
                  pattern,
                  required,
                  validate: item.validate,
                }}
                render={({ field, fieldState }) => {
                  const error = fieldState?.error;
                  return (
                    <div className='flex flex-col gap-1.5'>
                      {!isCheckbox && (
                        <label className="text-white font-bold mb-1">
                          {item.label}
                        </label>
                      )}
                      <div>
                        {isCheckbox ? (
                          <Component
                            placeholder={item.placeholder}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            {...field}
                            className={`${
                              error ? 'border-red-500' : ''
                            } focus:ring-0 text-white`}
                          />
                        ) : isSelect ? (
                          <Component
                            options={formatedStateData}
                            selectedValue={field.value}
                            onValueChange={field.onChange}
                            {...field}
                            contentClassName="h-[280px]"
                            className={`${
                              error ? 'border-red-500' : ''
                            } text-white focus:ring-0 w-full sm:max-w-[70%] md:max-w-[100%]`}
                          />
                        ) : (
                          <Component
                            placeholder={item.placeholder}
                            locked={item.locked}
                            {...field}
                            className={`rounded-md w-full bg-neutral-800 ${
                              error
                                ? 'border border-red-500 text-white'
                                : 'text-white'
                            }`}
                            {...(item.type === 'select' && { options })}
                          />
                        )}
                      </div>
                      {error && (
                        <div className="text-red-500 text-base mt-1">
                          {error?.message}
                        </div>
                      )}
                    </div>
                  );
                }}
              />
            );
          })}
        </div>

        <div className="mt-4 w-full py-4 flex gap-2 justify-between">
          <div className="text-[rgb(var(--lb-blue-250))] text-base">
            All data is safely stored and encrypted.
          </div>
          <Button
            loading={loading}
            disabled={loading}
            type="submit"
            className="bg-red-500 py-2 text-white rounded-full hover:bg-red-600"
          >
            Update
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
export default Profile;
