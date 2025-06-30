import React from 'react';
import "../styles/submit-button.scss";

interface SubmitButtonProps {
  children: React.ReactNode;
}

export default function SubmitButton(props: SubmitButtonProps) {
  return (
    <button className="submit-button" type="submit">{props.children}</button>
  )
}
