import { useFormikContext } from "formik";
import {
  useFetchCountries,
  useFetchStates,
} from "hooks/reactQuery/useCheckoutApi";
import { Typography } from "neetoui";
import { Input, Select } from "neetoui/formik";
import { useTranslation } from "react-i18next";

const Form = () => {
  const { t } = useTranslation();

  const {
    setFieldValue,
    values: { country },
  } = useFormikContext();

  const { data: countries = [] } = useFetchCountries();
  const { data: states = [] } = useFetchStates({
    countryCode: country.code,
  });

  const handleChangeCountry = country => {
    setFieldValue("country", country);
    setFieldValue("state", null);
  };

  return (
    <>
      <Typography style="h3" weight="semibold">
        {t("contact")}
      </Typography>
      <Input
        required
        label={t("form.email")}
        name="email"
        placeholder={t("form.emailPlaceholder")}
        size="large"
      />
      <Typography className="pt-5" style="h3" weight="semibold">
        {t("shippingAddress")}
      </Typography>
      <Select
        required
        label={t("form.country")}
        name="country"
        optionRemapping={{ label: "name", value: "code" }}
        options={countries}
        placeholder={t("form.selectCountry")}
        size="large"
        value={country}
        onChange={handleChangeCountry}
      />
      <div className="flex space-x-2">
        <Input
          required
          label={t("form.firstName")}
          name="firstName"
          placeholder={t("form.firstNamePlaceholder")}
          size="large"
        />
        <Input
          required
          label={t("form.lastName")}
          name="lastName"
          placeholder={t("form.lastNamePlaceholder")}
          size="large"
        />
      </div>
      <Input
        required
        label={t("form.address")}
        name="address"
        placeholder={t("form.addressPlaceholder")}
        size="large"
      />
      <Input
        required
        label={t("form.apartment")}
        name="apartment"
        placeholder={t("form.apartmentPlaceholder")}
        size="large"
      />
      <div className="flex space-x-2">
        <Input
          required
          label={t("form.city")}
          name="city"
          placeholder={t("form.cityPlaceholder")}
          size="large"
        />
        <Select
          required
          label={t("form.state")}
          name="state"
          optionRemapping={{ label: "name", value: "code" }}
          options={states}
          placeholder={t("form.statePlaceholder")}
          size="large"
        />
        <Input
          required
          label={t("zipCode")}
          name="zipCode"
          placeholder={t("enterZipCode")}
          size="large"
          type="number"
        />
      </div>
    </>
  );
};

export default Form;
