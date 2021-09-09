export class Customer {
    id: number = 0;
    applicationNumber: number = 0;
    username: string = '';
    password: string = '';
    contact: number = 0;
    email: string = '';
    adhaar: number = 0;
    pancard: string = '';
    status: string='pending';
    loanAmount: number = 0;
    cibilScore: number = 0;
    income: number = 0;
    documentsVerified: string = 'pending';
    incomeProofDocs: any = [];
    identityProofDocs: any= [];
    addressProofDocs: any = [];
}
