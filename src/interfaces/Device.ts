export interface Device {
    id: number;
    name: string;
    cameraFeed: string;
    motionDetected: boolean;
    ledOn: boolean;
    firmware: string;
    battery: number;
    enrolledUsers?: string[];

}
