interface homepageTextProps {
  date?: string;
  greeting?: string;
  user?: string;
  title?: string;
  description?: string;
}

const homepageText: React.FC<homepageTextProps> = ({
  date,
  greeting,
  user,
  title,
  description,
}) => {
  return (
    <div>
      <p className="text-base font-custom dark:text-font-white">{date}</p>
      <h1 className="font-custom font-bold lg:text-2xl text-base text-font-black dark:text-font-white pt-1">
        {greeting}{" "}
        <span className="text-light-gold lg:text-2xl text-base font-bold font-custom">
          {user}
        </span>
      </h1>
      <p className="text-sm lg:text-2xl font-custom text-font-black dark:text-font-white font-medium pt-6">
        {title}
      </p>
      <p className="text-xs lg:text-base font-custom text-font-black dark:text-font-white pt-1">
        {description}
      </p>
    </div>
  );
};

export default homepageText;
