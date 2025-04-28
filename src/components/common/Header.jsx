import { LeftArrow } from "neetoicons";
import { Typography } from "neetoui";
import { useHistory } from "react-router-dom";

const Header = ({ title, shouldDisplayBackButton = false }) => {
  const history = useHistory();

  return (
    <>
      <div className="mt-3 flex items-center gap-3 p-3">
        {shouldDisplayBackButton && (
          <LeftArrow
            className="cursor-pointer rounded-full"
            onClick={history.goBack}
          />
        )}
        <Typography className="" style="h1" weight="semibold">
          {title}
        </Typography>
      </div>
      <hr className="border-2 border-black" />
    </>
  );
};

export default Header;
