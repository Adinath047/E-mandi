// FormInput — labeled input with error state matching Stitch design

export default function FormInput({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  hint,
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="font-label-md text-[#161d1f]">
          {label}
          {required && <span className="text-[#ba1a1a] ml-0.5">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full bg-white border rounded py-2 px-3 font-body-sm text-[#161d1f] transition-all ${
          error
            ? 'border-[#ba1a1a] focus:ring-[#ba1a1a]/10'
            : 'border-[#c1c8c2] focus:border-[#012d1d] focus:ring-[#012d1d]/10'
        }`}
        {...props}
      />
      {hint && !error && <p className="font-body-sm text-[#414844] text-xs">{hint}</p>}
      {error && <p className="font-body-sm text-[#ba1a1a] text-xs">{error}</p>}
    </div>
  );
}

// FormSelect — dropdown select
export function FormSelect({
  label,
  id,
  value,
  onChange,
  options = [],
  placeholder,
  required = false,
  error,
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="font-label-md text-[#161d1f]">
          {label}
          {required && <span className="text-[#ba1a1a] ml-0.5">*</span>}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full bg-white border rounded py-2 px-3 font-body-sm text-[#161d1f] transition-all ${
          error
            ? 'border-[#ba1a1a]'
            : 'border-[#c1c8c2] focus:border-[#012d1d]'
        }`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) =>
          typeof opt === 'string' ? (
            <option key={opt} value={opt}>{opt}</option>
          ) : (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          )
        )}
      </select>
      {error && <p className="font-body-sm text-[#ba1a1a] text-xs">{error}</p>}
    </div>
  );
}
