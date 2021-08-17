class UserModel {
    public id: number;
    public email: string;
    public clientType: ClientType;
    public password: string;
    public token: string;

}
enum ClientType {
    company = "company",
    adminstrator = "adminstrator",
    customer = "customer"
}

export default UserModel;
