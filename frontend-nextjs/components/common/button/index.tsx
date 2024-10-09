interface SubmitProps {
  value: string;
  loading?: boolean;
  textAlign?: string;
  fluid: boolean;
  btnColor: string;
  onClick?: void;
}
const SubmitBtn = ({
  value,
  loading,
  textAlign,
  btnColor,
}: // onClick,
SubmitProps) => {
  return (
    <div className={textAlign}>
      <button className="primary-btn" disabled={loading} type="submit">
        {loading ? "Please wait" : value}
      </button>
    </div>
  );
};

export default SubmitBtn;
