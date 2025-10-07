import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const LLMResponse = ({ content }: { content: string }) => (
    <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
            code(props) {
                const { children, className, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");

                if (match) {
                    return (
                        <SyntaxHighlighter
                            language={match[1]}
                            PreTag="div"
                        >
                            {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                    );
                }

                return (
                    <code className={className} {...rest}>
                        {children}
                    </code>
                );
            },
        }}
    >
        {content}
    </ReactMarkdown>
);

export default LLMResponse;