import React from "react";

interface MainLayoutProps {
    className?: string;
    children: React.ReactNode;
}
class MainLayout extends React.Component<MainLayoutProps, any> {

    constructor(props: any) {
        super(props);
    }

    render(): React.ReactNode {
        const {children, className} = this.props;
        return (
            <>
                <header>Im header</header>
                <div className={`main ${className}`}>
                    {children}
                </div>
                <footer>Im footer</footer>
            </>
        );
    }
}

export default MainLayout;