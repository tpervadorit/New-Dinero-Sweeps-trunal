import Image from 'next/image';

const InviteCard = ({ platform, handleInvite }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Image src={platform.icon} alt={platform.name} width={28} height={28} />
        <span className="font-bold ml-2">{platform.name}</span>
      </div>
      <button
        className="text-white bg-[var(--button-danger)] hover:bg-white hover:text-[var(--button-danger)] px-6 py-1 rounded-md"
        onClick={() => handleInvite(platform)}
      >
        <span className="font-semibold">Invite</span>
      </button>
    </div>
  );
};

export default InviteCard;
