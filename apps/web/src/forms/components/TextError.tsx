import React from 'react';
import "../styles/text-error.scss";

interface TextErrorProps {
    children?: React.ReactNode;
    message?: string;
}

export default function TextError(props: TextErrorProps) {
  return (
    <div className="error">
      {props.children || props.message}
    </div>
  )
}