import profile from "../../assets/profile.webp";

const Profile = () => {
  return (
    <div className="bg-white dark:bg-transparent h-36 relative">
      <div className="absolute w-max top-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <img src={profile} alt="profile photo" className="rounded-full w-28" />
        <h2 className="font-medium dark:text-white">Hey, Cristiano Ronaldo</h2>
      </div>
    </div>
  );
};

export default Profile;
