    import React from "react";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

    const ApiResponseDisplay = ({ response }: { response: any }) => {
    if (!response) return null;

    return (
        <Card className="mt-4">
        <CardHeader>
            <CardTitle>API Response</CardTitle>
        </CardHeader>
        <CardContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
            {JSON.stringify(response, null, 2)}
            </pre>
        </CardContent>
        </Card>
    );
    };

    export default ApiResponseDisplay;
