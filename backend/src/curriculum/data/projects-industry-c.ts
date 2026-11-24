import type { Project } from '../types.js';

export const PROJECTS_INDUSTRY: Project[] = [
  {
    "id": "proj-terraform-vpc-stack",
    "slug": "terraform-vpc-stack",
    "level": 3,
    "title": "Provision a Production VPC with Terraform",
    "description": "Design and provision a production-ready AWS VPC with Terraform: public and private subnets across two availability zones, an internet gateway, a NAT gateway, route tables, and tightly scoped security groups. The VPC is a reusable module driven by variables, its key values are exposed as outputs, and its state is stored remotely so a team can share it. Done means `terraform apply` builds the whole network from a clean state, `terraform destroy` tears it down, and a second apply changes nothing.",
    "skills": ["Terraform", "AWS VPC", "Subnet design", "NAT gateways", "Route tables", "Security groups", "Terraform modules", "Remote state"],
    "language": "terraform",
    "functionalRequirements": [
      "Create a VPC with a configurable CIDR block and DNS hostnames enabled",
      "Create public and private subnets in at least two availability zones",
      "Attach an internet gateway and route public subnet traffic through it",
      "Provision a NAT gateway in a public subnet for private subnet egress",
      "Create separate route tables for public and private subnets and associate them correctly",
      "Create security groups that allow only the required ports (HTTP/HTTPS in, SSH only from a bastion CIDR)",
      "Expose VPC id, subnet ids, NAT gateway id and CIDR blocks as outputs",
      "Parameterise environment, CIDR blocks and AZs through variables with validation"
    ],
    "nonFunctionalRequirements": [
      "A second `terraform apply` reports no changes (idempotent)",
      "No resource is created with a hardcoded region or account id",
      "State is stored in a remote backend, never committed to Git",
      "Secrets such as access keys never appear in code or state outputs",
      "The plan is reviewable with `terraform plan` before any apply"
    ],
    "architecture": "The stack is a single root module that calls a reusable `vpc` module: the module owns the VPC, subnets, gateways, route tables and security groups, while the root module passes variables and collects outputs. Variables define the environment name, CIDR block, AZ list and subnet CIDRs; locals derive subnet names and tags. The remote backend (S3 + DynamoDB locking) holds state, and `terraform plan` is the review gate before every apply.",
    "databaseSchema": "",
    "apis": [
      "CLI: terraform init, terraform fmt, terraform validate, terraform plan, terraform apply, terraform destroy",
      "CLI: terraform output vpc_id, terraform output private_subnet_ids",
      "AWS: ec2:CreateVpc, CreateSubnet, CreateNatGateway, CreateRouteTable, CreateSecurityGroup"
    ],
    "fileStructure": "terraform-vpc-stack/\n  main.tf\n  variables.tf\n  outputs.tf\n  versions.tf\n  backend.tf\n  modules/\n    vpc/\n      main.tf\n      variables.tf\n      outputs.tf\n  environments/\n    dev.tfvars\n    prod.tfvars\n  README.md",
    "taskBreakdown": [
      "Design the CIDR layout and AZ placement for public and private subnets",
      "Write the reusable VPC module with subnets, gateways and route tables",
      "Add security groups with least-privilege rules",
      "Wire variables, validation and outputs in the root module",
      "Configure the remote backend with state locking",
      "Plan, apply and verify the network with AWS CLI checks",
      "Prove idempotency with a second apply and clean up with destroy",
      "Document the design and the apply/destroy runbook"
    ],
    "milestones": [
      {
        "id": "proj-terraform-vpc-stack-m1",
        "order": 1,
        "title": "Network design and module skeleton",
        "objectives": ["Design the CIDR layout", "Create the VPC module skeleton", "Define variables with validation"],
        "instructions": "Pick a /16 VPC CIDR and carve it into two public and two private /24 subnets across two availability zones, leaving room to grow. Create modules/vpc with main.tf, variables.tf and outputs.tf, and define root variables for environment, vpc_cidr, azs and subnet CIDRs with validation blocks that reject overlapping or out-of-range CIDRs. Run terraform fmt and terraform validate.",
        "concepts": ["CIDR addressing", "Availability zones", "Terraform variables"],
        "hints": ["Draw the CIDR plan on paper before writing any HCL.", "Use cidrsubnet() to derive subnet CIDRs from the VPC CIDR.", "Validation blocks catch bad input before a plan runs."],
        "acceptanceCriteria": ["The CIDR plan covers two AZs with public and private subnets", "Variables reject an invalid CIDR with a clear error", "terraform fmt and validate both pass", "No resource is hardcoded to a specific AZ name"],
        "tests": ["Run terraform validate on the skeleton", "Pass an invalid CIDR via -var and confirm rejection", "Run terraform fmt -check"]
      },
      {
        "id": "proj-terraform-vpc-stack-m2",
        "order": 2,
        "title": "Subnets, gateways and routing",
        "objectives": ["Create the VPC and subnets", "Add internet and NAT gateways", "Build public and private route tables"],
        "instructions": "Implement the VPC with DNS hostnames enabled, the four subnets with map_public_ip_on_launch set only on public ones, an internet gateway, one NAT gateway in a public subnet with an Elastic IP, and two route tables: public routes 0.0.0.0/0 to the internet gateway, private routes 0.0.0.0/0 to the NAT gateway. Associate each subnet with the correct table and run terraform plan to review every resource before applying.",
        "concepts": ["Internet gateways", "NAT gateways", "Route tables"],
        "hints": ["A NAT gateway must live in a public subnet with an Elastic IP.", "Private subnets need a route to the NAT, never to the internet gateway.", "Use for_each over the AZ list so adding an AZ adds its subnets."],
        "acceptanceCriteria": ["Plan shows the VPC, 4 subnets, IGW, NAT gateway and 2 route tables", "Public subnets route 0.0.0.0/0 to the internet gateway", "Private subnets route 0.0.0.0/0 to the NAT gateway", "NAT gateway depends on the internet gateway"],
        "tests": ["Run terraform plan and count the planned resources", "Inspect the planned route tables in the plan output", "Apply and check routes with the AWS CLI"]
      },
      {
        "id": "proj-terraform-vpc-stack-m3",
        "order": 3,
        "title": "Security groups and outputs",
        "objectives": ["Create least-privilege security groups", "Expose outputs for consumers", "Tag every resource consistently"],
        "instructions": "Add security groups: a web group allowing HTTP/HTTPS from 0.0.0.0/0, an app group allowing traffic only from the web group, and a bastion group allowing SSH only from a configurable admin CIDR. Tag every resource with environment, project and managed-by tags via a locals block. Add outputs for the VPC id, public and private subnet ids, NAT gateway id and CIDR blocks.",
        "concepts": ["Security groups", "Least privilege", "Terraform outputs"],
        "hints": ["Reference another security group as a source instead of opening a CIDR.", "Keep egress restricted to what the workload actually needs.", "Outputs are the contract other stacks consume."],
        "acceptanceCriteria": ["No security group allows SSH from 0.0.0.0/0", "App group accepts traffic only from the web group", "terraform output lists VPC and subnet ids", "Every resource carries the standard tags"],
        "tests": ["Apply and inspect security group rules with the AWS CLI", "Run terraform output and verify the ids", "Check tags on a subnet and a security group"]
      },
      {
        "id": "proj-terraform-vpc-stack-m4",
        "order": 4,
        "title": "Remote state, idempotency and teardown",
        "objectives": ["Configure a remote backend with locking", "Prove a second apply is a no-op", "Destroy cleanly and document the runbook"],
        "instructions": "Create the S3 state bucket with versioning and encryption plus a DynamoDB lock table, then configure backend.tf to use them and migrate state with terraform init -migrate-state. Apply, then run apply a second time and confirm it reports no changes. Launch a test instance in a private subnet to prove outbound internet works via NAT and inbound internet does not, then destroy everything and confirm the VPC is gone.",
        "concepts": ["Remote state", "State locking", "Idempotency"],
        "hints": ["Never commit .tfstate files; the backend block replaces them.", "Test locking by running two applies at once.", "Destroy in the same workspace you applied from."],
        "acceptanceCriteria": ["State lives in S3 and a concurrent apply is blocked by the lock", "A second apply reports no changes", "A private instance can reach the internet but is not reachable from it", "terraform destroy removes the VPC and all its resources"],
        "tests": ["Run two concurrent applies and confirm one is locked out", "Run apply twice and compare the output", "Destroy and verify the VPC no longer exists"]
      }
    ],
    "reviewChecklist": [
      "Public and private subnets exist in at least two AZs with correct routes",
      "No security group exposes SSH to the world",
      "A second apply is a no-op",
      "State is remote with locking and not in Git",
      "Outputs expose everything a downstream stack needs"
    ],
    "finalAssessment": [
      "Show the CIDR plan and explain why each subnet exists",
      "Apply from a clean state and show the created network",
      "Prove a private instance reaches out via NAT but is not reachable",
      "Run a second apply and show zero changes",
      "Destroy the stack and confirm clean teardown"
    ]
  },
  {
    "id": "proj-terraform-multi-env-infra",
    "slug": "terraform-multi-env-infra",
    "level": 4,
    "title": "Multi-Environment Infrastructure with Terraform",
    "description": "Take one Terraform codebase and deploy it to dev, staging and production with real environment parity: workspaces plus per-environment variable files, environment-specific sizing, and a parity check that fails the pipeline when environments drift apart in structure. Dev is small and cheap, prod is multi-AZ and hardened, but both come from the same modules and the same code. Done means all three environments deploy from one commit, `terraform plan` shows only the intended sizing differences, and the parity report is green.",
    "skills": ["Terraform workspaces", "Variable files", "Environment parity", "Terraform modules", "Remote state per environment", "Sizing strategy", "Drift detection", "CI gates"],
    "language": "terraform",
    "functionalRequirements": [
      "Deploy the same root module to dev, staging and prod from one codebase",
      "Isolate each environment's state with workspaces or per-environment backends",
      "Drive environment differences only through .tfvars files and workspace locals",
      "Size dev to a single AZ and minimal instances, prod to multi-AZ with redundancy",
      "Apply environment-specific tags, naming and cost controls per environment",
      "Block production applies behind an explicit approval variable or gate",
      "Produce a parity report comparing planned resources across environments",
      "Support promoting a change dev -> staging -> prod with the same plan artifact"
    ],
    "nonFunctionalRequirements": [
      "No environment-specific resource is hardcoded in a module",
      "A typo in one environment's tfvars cannot affect another environment",
      "State for one environment is never readable by another environment's backend key",
      "The parity check runs in CI on every pull request",
      "Destroying dev never touches staging or prod state"
    ],
    "architecture": "One root module composes shared modules (network, compute, database) and is deployed three times: each environment is a Terraform workspace with its own .tfvars file and its own state key under env:/ in the same remote backend. A locals block maps workspace names to sizing and feature flags, so modules stay environment-agnostic. A small parity script runs terraform plan for each workspace, strips the sizing fields, and diffs the remaining resource graph; CI fails the pull request when the graphs differ.",
    "databaseSchema": "",
    "apis": [
      "CLI: terraform workspace new/select/list, terraform plan -var-file, terraform apply -var-file",
      "CLI: terraform show -json for the parity comparison script",
      "Script: scripts/parity-check.sh compares planned resource types across workspaces"
    ],
    "fileStructure": "multi-env-infra/\n  main.tf\n  variables.tf\n  outputs.tf\n  locals.tf\n  backend.tf\n  modules/\n    network/\n    compute/\n    database/\n  environments/\n    dev.tfvars\n    staging.tfvars\n    prod.tfvars\n  scripts/\n    parity-check.sh\n    promote.sh\n  README.md",
    "taskBreakdown": [
      "Refactor the single-environment stack into shared modules",
      "Set up workspaces and per-environment state keys",
      "Write the three tfvars files with environment sizing",
      "Add workspace-driven locals for naming, tags and feature flags",
      "Build the parity check script and wire it into CI",
      "Deploy dev, then staging, then prod in order",
      "Test promotion of a change through all three environments",
      "Document the environment matrix and the promotion runbook"
    ],
    "milestones": [
      {
        "id": "proj-terraform-multi-env-infra-m1",
        "order": 1,
        "title": "Modularise the codebase",
        "objectives": ["Extract network, compute and database modules", "Keep modules environment-agnostic", "Preserve the existing dev deployment"],
        "instructions": "Split the existing single-environment configuration into modules/network, modules/compute and modules/database, each taking only generic inputs such as cidr, instance_type and instance_count. The root module wires them together. Verify the refactor by running terraform plan against the current dev state and confirming it proposes no changes.",
        "concepts": ["Module boundaries", "Refactoring with moved blocks", "Environment-agnostic design"],
        "hints": ["Use moved blocks so the refactor does not destroy live resources.", "A module that mentions 'prod' by name is not reusable.", "Plan before and after the refactor and diff the two plans."],
        "acceptanceCriteria": ["Modules contain no environment names", "Plan after refactor shows zero changes to dev", "Root module is under 150 lines", "terraform validate passes"],
        "tests": ["Run plan before and after the refactor and compare", "Grep modules for dev/staging/prod strings", "Run terraform validate"]
      },
      {
        "id": "proj-terraform-multi-env-infra-m2",
        "order": 2,
        "title": "Workspaces and per-environment state",
        "objectives": ["Create dev, staging and prod workspaces", "Isolate state per environment", "Write the three tfvars files"],
        "instructions": "Configure the backend with a workspace key prefix so each workspace gets its own state file, then create the dev, staging and prod workspaces. Write environments/dev.tfvars (single AZ, t3.micro, one instance), staging.tfvars (two AZs, t3.small, two instances) and prod.tfvars (two AZs, t3.medium, three instances, backups on). Select each workspace and confirm terraform workspace show and the state key match.",
        "concepts": ["Workspaces", "State isolation", "Variable files"],
        "hints": ["terraform.workspace is available in expressions for naming.", "Keep secrets out of tfvars; use variables from CI secrets.", "One backend, three state keys beats three backends."],
        "acceptanceCriteria": ["Three workspaces exist with separate state keys", "Each tfvars file deploys with its own sizing", "Selecting a workspace changes the plan's naming and tags", "Dev state is not visible from the prod workspace"],
        "tests": ["List workspaces and inspect state keys in S3", "Plan each workspace and compare instance counts", "Apply dev and confirm staging state is untouched"]
      },
      {
        "id": "proj-terraform-multi-env-infra-m3",
        "order": 3,
        "title": "Environment locals and prod guardrails",
        "objectives": ["Drive sizing from workspace locals", "Add prod-only hardening", "Gate production applies"],
        "instructions": "Add a locals.tf that maps terraform.workspace to sizing, feature flags and tags, and make the root module consume locals instead of raw variables for anything environment-shaped. In prod only: enable deletion protection, backups and multi-AZ database. Add a prod guard variable that refuses to apply unless an explicit confirm flag is passed, so a stray apply cannot touch production.",
        "concepts": ["Workspace locals", "Feature flags", "Guardrails"],
        "hints": ["A lookup map keyed by workspace keeps the logic in one place.", "Prod guardrails should be defaults, not something to remember.", "Test the guard by applying to prod without the flag."],
        "acceptanceCriteria": ["Prod plan shows deletion protection and backups enabled", "Dev plan shows them off", "Prod apply without the confirm flag fails fast", "No environment logic leaks into modules"],
        "tests": ["Plan prod and check for deletion protection", "Attempt a prod apply without the flag", "Plan dev and confirm single-AZ sizing"]
      },
      {
        "id": "proj-terraform-multi-env-infra-m4",
        "order": 4,
        "title": "Parity checks and promotion",
        "objectives": ["Build the parity check script", "Fail CI on structural drift", "Promote one change through all environments"],
        "instructions": "Write scripts/parity-check.sh: for each workspace it runs terraform plan, converts it with terraform show -json, strips sizing fields (instance counts, types, backup retention), and diffs the remaining resource type and count graph, exiting non-zero on structural differences. Wire it into CI on pull requests. Then promote a real change — add a new tag or a new security group rule — by applying it to dev, verifying, then staging, then prod, using the same plan artifact.",
        "concepts": ["Environment parity", "Plan JSON", "Promotion pipelines"],
        "hints": ["Parity is about structure, not size: strip the sizing fields first.", "The same commit must produce all three plans.", "Promotion order is always dev, staging, prod — never the reverse."],
        "acceptanceCriteria": ["Parity script passes when only sizing differs", "Parity script fails when a resource exists in one env only", "CI runs the parity check on every pull request", "One change is live in all three environments from one commit"],
        "tests": ["Run the parity script on the clean tree", "Add a resource to one tfvars path and watch it fail", "Promote a change and verify it in all three environments"]
      }
    ],
    "reviewChecklist": [
      "All three environments deploy from the same commit",
      "No module mentions an environment by name",
      "State is isolated per environment",
      "Prod has hardening and an apply guardrail",
      "The parity check catches structural drift in CI"
    ],
    "finalAssessment": [
      "Deploy all three environments from one commit",
      "Show the sizing differences and explain each one",
      "Demonstrate the prod guard blocking an unconfirmed apply",
      "Introduce a structural drift and show the parity check failing",
      "Promote a change dev to staging to prod in order"
    ]
  },
  {
    "id": "proj-terraform-state-pipeline",
    "slug": "terraform-state-pipeline",
    "level": 4,
    "title": "Terraform State & Collaboration Pipeline",
    "description": "Build the collaboration machinery a team needs around Terraform: remote state with locking, a safe migration of local state into the remote backend, and a pull-request pipeline where every change gets a reviewed plan before it can apply. The pipeline posts the plan as a PR comment, applies only after approval, and records every apply. Done means two engineers can work on the same stack without clobbering each other's state, a plan is visible on every PR, and a bad plan can be rejected before it touches anything.",
    "skills": ["Remote state", "State locking", "State migration", "CI/CD pipelines", "Plan review", "Pull request workflow", "Terraform Cloud alternatives", "Incident recovery"],
    "language": "terraform",
    "functionalRequirements": [
      "Store Terraform state remotely with versioning and encryption",
      "Lock state during applies so concurrent runs cannot corrupt it",
      "Migrate an existing local state file into the remote backend without recreating resources",
      "Run fmt, validate and plan automatically on every pull request",
      "Post the plan output as a comment on the pull request",
      "Apply only from the main branch after PR approval and merge",
      "Record every apply with who approved it, what changed and when",
      "Support a safe recovery path for a stuck lock and a corrupted state"
    ],
    "nonFunctionalRequirements": [
      "State files are never committed to Git",
      "A second concurrent apply is blocked, not merged",
      "No apply happens without a reviewed plan",
      "Credentials are passed via environment variables or OIDC, never hardcoded",
      "The pipeline fails loudly on fmt, validate or plan errors"
    ],
    "architecture": "State lives in an S3 bucket with versioning and server-side encryption, locked by a DynamoDB table. The CI pipeline has two workflows: a PR workflow that runs fmt -check, validate and plan and posts the plan as a comment, and an apply workflow that runs only on merge to main after approval, applies the reviewed plan file, and appends an entry to an apply log. Engineers authenticate with short-lived OIDC credentials. A runbook covers unlocking a stuck lock with force-unlock and recovering state from a previous S3 version.",
    "databaseSchema": "",
    "apis": [
      "CLI: terraform init -migrate-state, terraform force-unlock, terraform state list/pull/push",
      "CI: GitHub Actions workflows pr.yml and apply.yml",
      "AWS: S3 versioning for state recovery, DynamoDB for locking"
    ],
    "fileStructure": "terraform-state-pipeline/\n  main.tf\n  backend.tf\n  variables.tf\n  outputs.tf\n  .github/\n    workflows/\n      pr.yml\n      apply.yml\n  scripts/\n    plan-comment.sh\n    apply-log.sh\n  docs/\n    state-runbook.md\n  README.md",
    "taskBreakdown": [
      "Create the remote backend bucket and lock table",
      "Migrate local state into the backend safely",
      "Build the PR workflow with fmt, validate and plan",
      "Post the plan as a PR comment",
      "Build the apply workflow with approval and logging",
      "Test concurrent applies and lock behaviour",
      "Practise lock recovery and state rollback",
      "Write the state runbook for the team"
    ],
    "milestones": [
      {
        "id": "proj-terraform-state-pipeline-m1",
        "order": 1,
        "title": "Remote backend and state migration",
        "objectives": ["Create the backend bucket and lock table", "Migrate local state without recreation", "Verify the migration"],
        "instructions": "Create an S3 bucket with versioning and encryption enabled and a DynamoDB table with a LockID hash key. Take a small existing stack with local state, add backend.tf pointing at the bucket and table, and run terraform init -migrate-state, answering yes to the migration prompt. Confirm with terraform state list that every resource is still tracked and terraform plan shows no changes.",
        "concepts": ["Remote backends", "State migration", "Lock tables"],
        "hints": ["Back up the local state file before migrating.", "Versioning on the bucket is your state recovery mechanism.", "Plan must show zero changes after a clean migration."],
        "acceptanceCriteria": ["State file exists in S3 with versioning on", "terraform state list matches the pre-migration list", "Plan after migration shows no changes", "Local .tfstate is removed and gitignored"],
        "tests": ["List state before and after migration and compare", "Run plan after migration", "Check the bucket for the state object and its versions"]
      },
      {
        "id": "proj-terraform-state-pipeline-m2",
        "order": 2,
        "title": "PR pipeline with plan review",
        "objectives": ["Run fmt, validate and plan on every PR", "Post the plan as a PR comment", "Block merging on pipeline failure"],
        "instructions": "Write .github/workflows/pr.yml: on pull_request it checks out the code, configures credentials via OIDC, runs terraform fmt -check, terraform init and terraform validate, then terraform plan -out=tfplan and terraform show to render the plan, and posts it as a PR comment. Set branch protection so the workflow must pass before merging. Open a PR that adds a resource and one that breaks formatting, and confirm the first gets a plan comment and the second fails.",
        "concepts": ["CI pipelines", "Plan as review artifact", "Branch protection"],
        "hints": ["Post the plan summary, not the full raw output, to keep comments readable.", "OIDC beats long-lived access keys in CI.", "fmt -check catches style drift before review."],
        "acceptanceCriteria": ["Every PR gets a plan comment with adds/changes/destroys", "A formatting break fails the pipeline", "Merging is blocked while the workflow fails", "No credentials appear in logs"],
        "tests": ["Open a PR adding a resource and read the plan comment", "Open a PR with bad formatting and watch it fail", "Try merging with a failing check"]
      },
      {
        "id": "proj-terraform-state-pipeline-m3",
        "order": 3,
        "title": "Approved apply and apply log",
        "objectives": ["Apply only from main after approval", "Reuse the reviewed plan file", "Log every apply"],
        "instructions": "Write .github/workflows/apply.yml: it runs only on push to main, requires a GitHub environment approval, downloads the plan artifact produced by the PR workflow (or re-plans and requires the diff to match), runs terraform apply on it, and appends a line to an apply log with the commit, approver, timestamp and resource changes. Merge a reviewed PR and confirm the apply runs, the resource appears, and the log records it.",
        "concepts": ["Environment approvals", "Plan artifacts", "Audit logging"],
        "hints": ["Applying the reviewed plan file, not a fresh plan, closes the review gap.", "The approver must not be the PR author.", "The log is the audit trail — keep it append-only."],
        "acceptanceCriteria": ["Apply runs only after merge to main", "Apply waits for an environment approval", "The applied plan matches the reviewed plan", "The apply log records commit, approver and changes"],
        "tests": ["Merge a PR and watch the apply workflow wait for approval", "Approve and confirm the resource is created", "Read the apply log entry"]
      },
      {
        "id": "proj-terraform-state-pipeline-m4",
        "order": 4,
        "title": "Locking, recovery and runbook",
        "objectives": ["Prove concurrent applies are blocked", "Recover from a stuck lock", "Recover state from a previous version"],
        "instructions": "Start two applies at once and confirm the second is blocked by the DynamoDB lock with a clear error. Then simulate a stuck lock by killing an apply mid-run and recover it with terraform force-unlock using the recorded lock ID, after confirming no apply is actually running. Simulate state corruption by restoring a previous S3 version of the state file and running plan to confirm it matches reality. Write all of this into docs/state-runbook.md.",
        "concepts": ["State locking", "Force-unlock", "State recovery"],
        "hints": ["Never force-unlock while an apply is running — check first.", "The lock ID is in the error message; save it.", "S3 versioning makes state recovery a download, not a rebuild."],
        "acceptanceCriteria": ["A concurrent apply is blocked, not merged", "A stuck lock is released safely with force-unlock", "State is recoverable from a previous S3 version", "The runbook documents both recovery paths"],
        "tests": ["Run two applies concurrently and record the lock error", "Kill an apply and force-unlock it", "Restore a previous state version and run plan"]
      }
    ],
    "reviewChecklist": [
      "State is remote, versioned, encrypted and locked",
      "Migration preserved every resource with a zero-change plan",
      "Every PR carries a readable plan comment",
      "Applies need merge plus approval and are logged",
      "Lock and corruption recovery are practised and documented"
    ],
    "finalAssessment": [
      "Migrate a local state file to the remote backend live",
      "Open a PR and walk through its plan comment",
      "Merge with approval and show the apply and its log entry",
      "Trigger a lock conflict and recover from it",
      "Restore state from a previous version and explain the steps"
    ]
  },
  {
    "id": "proj-docker-containerise-app",
    "slug": "docker-containerise-app",
    "level": 2,
    "title": "Containerise & Ship an Application with Docker",
    "description": "Take a small Python web app that currently only runs on its author's laptop and turn it into a portable container: a multi-stage Dockerfile that builds a small, secure image, proper tagging, a health check, and a run configuration that works the same on any machine. Done means a teammate can run `docker run` with no Python installed and get the same working app, the image is under a stated size budget, and a broken build fails before anything ships.",
    "skills": ["Docker", "Multi-stage builds", "Dockerfile design", "Image tagging", "Health checks", "Layer caching", "Container networking", "Python web apps"],
    "language": "docker",
    "functionalRequirements": [
      "Write a Dockerfile that builds and runs the web app from the repo alone",
      "Use a multi-stage build so the final image contains no build tools or source history",
      "Pin the base image by tag and run the app as a non-root user",
      "Expose the app port and make it reachable at localhost from the host",
      "Add a health check that reports healthy only when the app responds",
      "Tag images with both a version and the Git commit SHA",
      "Pass configuration through environment variables, not baked-in files",
      "Support rebuilding with layer caching so a code-only change is fast"
    ],
    "nonFunctionalRequirements": [
      "The final image is under 200 MB",
      "The image contains no secrets or .env files",
      "The container starts in under 5 seconds",
      "A container that crashes is restarted automatically by the run config",
      "The same image runs unchanged on another machine"
    ],
    "architecture": "The Dockerfile has two stages: a build stage that installs dependencies into a virtual environment, and a slim runtime stage that copies only the virtual environment and the application code, sets a non-root user, and starts the server. The app reads its port and settings from environment variables and exposes /health. A .dockerignore keeps the build context small, and docker run maps the host port and passes the environment file.",
    "databaseSchema": "",
    "apis": [
      "CLI: docker build, docker run, docker ps, docker logs, docker inspect, docker images",
      "App: GET / — homepage, GET /health — liveness, GET /api/items — sample data"
    ],
    "fileStructure": "containerise-app/\n  app/\n    main.py\n    requirements.txt\n  Dockerfile\n  .dockerignore\n  docker-compose.yml\n  README.md",
    "taskBreakdown": [
      "Get the app running locally without Docker first",
      "Write a single-stage Dockerfile and run it",
      "Convert it to a multi-stage build and shrink the image",
      "Add a non-root user, health check and .dockerignore",
      "Tag the image with version and commit SHA",
      "Test the image on a clean machine or with the cache cleared",
      "Document the build, run and tag commands",
      "Measure image size and startup time against the budgets"
    ],
    "milestones": [
      {
        "id": "proj-docker-containerise-app-m1",
        "order": 1,
        "title": "Run the app locally and write the first Dockerfile",
        "objectives": ["Run the app on the host", "Write a working Dockerfile", "Run the app in a container"],
        "instructions": "Clone the sample app, install its dependencies and run it locally to confirm it serves its pages. Then write a Dockerfile that starts from a pinned Python image, copies requirements, installs them, copies the app code, exposes the port and starts the server. Build it, run it with a port mapping, and open the app in a browser.",
        "concepts": ["Base images", "Dockerfile instructions", "Port mapping"],
        "hints": ["Pin the base image tag; 'latest' moves under you.", "Copy requirements first so dependency layers cache.", "docker logs is the first place to look when a container exits."],
        "acceptanceCriteria": ["The app runs locally without Docker", "docker build succeeds", "The app answers on localhost from inside the container", "docker ps shows the container running"],
        "tests": ["curl the app homepage on the host", "Build the image and run it", "Stop the container and run it again"]
      },
      {
        "id": "proj-docker-containerise-app-m2",
        "order": 2,
        "title": "Multi-stage build and image hygiene",
        "objectives": ["Convert to a multi-stage build", "Shrink the image below budget", "Remove secrets and build tools from the final image"],
        "instructions": "Split the Dockerfile into a build stage that installs dependencies and a slim runtime stage that copies only the virtual environment and app code. Add a .dockerignore that excludes .git, __pycache__, .env and tests. Run the app as a non-root user, rebuild, and compare image sizes with docker images. Verify no secret files exist in the final image by listing its files.",
        "concepts": ["Multi-stage builds", "Layer caching", "Least privilege"],
        "hints": ["The runtime stage should not contain pip or a compiler.", "Check the image contents with docker run --rm image ls.", "A small context also makes builds faster."],
        "acceptanceCriteria": ["Final image is under 200 MB", "No build tools are present in the final image", "The app runs as a non-root user", ".env is not present in the image"],
        "tests": ["Compare image sizes before and after", "List files inside the final image", "Check the running user with docker exec"]
      },
      {
        "id": "proj-docker-containerise-app-m3",
        "order": 3,
        "title": "Health checks, tagging and config",
        "objectives": ["Add a container health check", "Tag images reproducibly", "Move config to environment variables"],
        "instructions": "Add a HEALTHCHECK to the Dockerfile that curls the app's /health endpoint, and confirm docker ps shows (healthy) after startup. Move the port and any settings into environment variables read by the app, and run the container with an env file. Tag the image with the app version and the current Git SHA, push the tags to a local registry or record them, and document the tagging scheme.",
        "concepts": ["Health checks", "Image tags", "Twelve-factor config"],
        "hints": ["The health endpoint must be cheap and dependency-free.", "Tag with both a moving tag and an immutable SHA tag.", "Never bake a secret into an image layer."],
        "acceptanceCriteria": ["docker ps shows the container as healthy", "The app honours the PORT environment variable", "Images carry version and SHA tags", "Removing the env file fails fast with a clear error"],
        "tests": ["Wait for healthy status in docker ps", "Run with a different port via env var", "Run docker images and inspect the tags"]
      },
      {
        "id": "proj-docker-containerise-app-m4",
        "order": 4,
        "title": "Portability check and ship",
        "objectives": ["Prove the image runs on a clean machine", "Measure startup time", "Write the ship runbook"],
        "instructions": "Export the image, remove it locally, import it again (or pull it on a second machine) and run it with only Docker installed — no Python, no repo. Measure cold startup time and confirm it is under 5 seconds. Kill the container mid-request and confirm the restart policy brings it back. Finish the README with build, run, tag and troubleshooting commands.",
        "concepts": ["Image portability", "Restart policies", "Runbooks"],
        "hints": ["docker save and docker load simulate a registry transfer.", "Test with --no-cache once to catch hidden host dependencies.", "The README is what your teammate actually runs."],
        "acceptanceCriteria": ["The image runs with only Docker installed", "Cold start is under 5 seconds", "A killed container restarts automatically", "The README lets a new teammate ship the app"],
        "tests": ["Rebuild with --no-cache and run", "Save, remove, load and run the image", "Kill the container and watch it restart"]
      }
    ],
    "reviewChecklist": [
      "The image is multi-stage and under 200 MB",
      "The app runs as a non-root user",
      "A health check reports healthy",
      "No secrets are baked into the image",
      "Tags are versioned and reproducible"
    ],
    "finalAssessment": [
      "Build the image from a clean checkout",
      "Run it and show the healthy status",
      "Prove it runs with no Python installed on the host",
      "Show the image size and explain every layer",
      "Kill the container and show it restarting"
    ]
  },
  {
    "id": "proj-docker-cicd-shipping",
    "slug": "docker-cicd-shipping",
    "level": 4,
    "title": "Ship with Docker & CI/CD",
    "description": "Build the full shipping pipeline for a containerised app: on every push, CI builds the image, runs the test suite inside it, scans it for known vulnerabilities, and pushes it to a registry only if everything passes; a tagged release then deploys that exact image to a staging host, runs a smoke test, and rolls back if the health check fails. Done means a bad commit can never reach staging, every deployed image is traceable to a commit and a scan report, and a failed deploy restores the previous version automatically.",
    "skills": ["CI/CD pipelines", "Docker builds", "Image scanning", "Container registries", "Semantic versioning", "Smoke testing", "Rollback", "GitHub Actions"],
    "language": "docker",
    "functionalRequirements": [
      "Build the Docker image in CI on every push and pull request",
      "Run the app's test suite inside the built image before pushing",
      "Scan the image for vulnerabilities and fail the pipeline above a severity threshold",
      "Push images to a registry tagged with the commit SHA and the release version",
      "Deploy a tagged release to a staging host with a pull and restart",
      "Run a smoke test against staging after every deploy",
      "Roll back automatically to the previous image when the smoke test fails",
      "Record every release with image digest, commit, scan result and deploy outcome"
    ],
    "nonFunctionalRequirements": [
      "No image reaches the registry without passing tests and scan",
      "The pipeline fails fast and reports which stage failed",
      "Registry credentials are stored as CI secrets, never in the repo",
      "A rollback completes in under 2 minutes",
      "The same image digest is tested, scanned and deployed"
    ],
    "architecture": "A GitHub Actions workflow has jobs for build, test, scan and push: the image is built once with BuildKit layer caching, tests run inside it, Trivy scans it and fails on HIGH or CRITICAL findings, and only then is it pushed with SHA and version tags. A separate deploy workflow triggers on a GitHub release, pulls the exact digest on the staging host, starts it beside the old container, smoke-tests it, swaps traffic on success and restores the previous image on failure. A releases log records every deployment.",
    "databaseSchema": "",
    "apis": [
      "CI: GitHub Actions workflows ci.yml and release.yml",
      "CLI: docker buildx build, docker push, docker pull, trivy image",
      "Deploy: scripts/deploy.sh, scripts/smoke.sh, scripts/rollback.sh"
    ],
    "fileStructure": "docker-cicd-shipping/\n  app/\n    main.py\n    requirements.txt\n    tests/\n  Dockerfile\n  .github/\n    workflows/\n      ci.yml\n      release.yml\n  scripts/\n    deploy.sh\n    smoke.sh\n    rollback.sh\n  releases.log\n  README.md",
    "taskBreakdown": [
      "Containerise the app with a testable Dockerfile",
      "Write the CI workflow that builds and tests the image",
      "Add the vulnerability scan gate",
      "Push passing images to the registry with SHA and version tags",
      "Write the staging deploy script with a health gate",
      "Wire releases to trigger deploys",
      "Add automatic rollback on smoke test failure",
      "Document the release process and the releases log"
    ],
    "milestones": [
      {
        "id": "proj-docker-cicd-shipping-m1",
        "order": 1,
        "title": "CI build and in-image tests",
        "objectives": ["Build the image in CI", "Run tests inside the image", "Cache layers to keep builds fast"],
        "instructions": "Write .github/workflows/ci.yml: on push and pull request it checks out the code, sets up Buildx with layer caching, builds the image, then runs the test suite inside the built image with docker run. Open a PR with a passing change and one with a failing test, and confirm the pipeline passes the first and fails the second before anything is pushed anywhere.",
        "concepts": ["CI pipelines", "Buildx caching", "Testing the artifact"],
        "hints": ["Test the image you ship, not the host checkout.", "Cache layers in the registry to speed up CI.", "A failing test must stop the pipeline here."],
        "acceptanceCriteria": ["CI builds the image on every PR", "Tests run inside the built image", "A failing test fails the pipeline", "Builds reuse cached layers on repeat runs"],
        "tests": ["Open a passing PR and watch CI go green", "Break a test and open a PR", "Check build times on a second run"]
      },
      {
        "id": "proj-docker-cicd-shipping-m2",
        "order": 2,
        "title": "Vulnerability scanning gate",
        "objectives": ["Scan the image with Trivy", "Fail on HIGH and CRITICAL findings", "Fix or document findings"],
        "instructions": "Add a scan job to the CI workflow that runs Trivy against the built image and fails the pipeline on HIGH or CRITICAL vulnerabilities. Fix the findings you can — usually by upgrading the base image or a dependency — and document any accepted risk with an expiry date. Verify the gate by temporarily pinning an old vulnerable base image and watching the pipeline fail.",
        "concepts": ["Image scanning", "CVE severity", "Risk acceptance"],
        "hints": ["Scan the final image, not the build stage.", "Pin versions so a scan result is reproducible.", "Accepted risks need an owner and an expiry."],
        "acceptanceCriteria": ["The scan runs on every build", "HIGH or CRITICAL findings fail the pipeline", "The shipped image has zero HIGH or CRITICAL findings", "Accepted risks are documented with expiry"],
        "tests": ["Run Trivy locally on the image", "Pin a vulnerable base image and watch CI fail", "Review the scan report for the passing image"]
      },
      {
        "id": "proj-docker-cicd-shipping-m3",
        "order": 3,
        "title": "Registry push and tagged releases",
        "objectives": ["Push passing images to a registry", "Tag with SHA and semver", "Trigger deploys from releases"],
        "instructions": "Extend the workflow so images that pass tests and scan are pushed to the registry tagged with the commit SHA and, on a Git tag, with the semver version. Create a release v1.0.0 and confirm the versioned image appears in the registry with the same digest as the scanned one. Write the deploy workflow that triggers on release publication and records the image digest in releases.log.",
        "concepts": ["Registries", "Immutable tags", "Release-driven deploys"],
        "hints": ["The SHA tag is immutable; the version tag is the human name.", "Push only after tests and scan pass.", "The digest, not the tag, is the identity of the image."],
        "acceptanceCriteria": ["Only passing images reach the registry", "SHA and version tags point at the same digest", "A release triggers the deploy workflow", "releases.log records the digest and commit"],
        "tests": ["Push a passing build and list registry tags", "Create a release and check the version tag", "Compare digests of the SHA and version tags"]
      },
      {
        "id": "proj-docker-cicd-shipping-m4",
        "order": 4,
        "title": "Staging deploy, smoke test and rollback",
        "objectives": ["Deploy the tagged image to staging", "Smoke-test after deploy", "Roll back automatically on failure"],
        "instructions": "Write scripts/deploy.sh: it pulls the release digest, starts the new container beside the old one, waits for healthy status, then swaps the port mapping and stops the old container. scripts/smoke.sh exercises the homepage and health endpoint. If either fails, the script restores the previous image and records the rollback. Test the happy path with a good release and the rollback path with a release whose health endpoint is broken.",
        "concepts": ["Blue-green deploys", "Smoke tests", "Automatic rollback"],
        "hints": ["Record the previous image tag before every deploy.", "Rollback is just a deploy of the previous digest.", "The smoke script must exit non-zero on any failure."],
        "acceptanceCriteria": ["A good release deploys and passes the smoke test", "A broken release rolls back automatically", "Rollback completes in under 2 minutes", "Every deploy and rollback is logged"],
        "tests": ["Deploy a good release and run the smoke test", "Deploy a broken release and watch the rollback", "Check staging serves the previous version after rollback"]
      }
    ],
    "reviewChecklist": [
      "Tests run inside the image that ships",
      "The scan gate blocks vulnerable images",
      "Deploys use immutable digests",
      "A failed deploy rolls back automatically",
      "Every release is logged with digest and outcome"
    ],
    "finalAssessment": [
      "Push a breaking change and show CI stopping it",
      "Show a scan report and explain the findings",
      "Cut a release and trace it to the deployed digest",
      "Deploy a broken release and show automatic rollback",
      "Read the releases log for the whole history"
    ]
  },
  {
    "id": "proj-docker-compose-prod-stack",
    "slug": "docker-compose-prod-stack",
    "level": 3,
    "title": "Production Stack with Docker Compose",
    "description": "Compose a full production-style stack with Docker Compose: a web app, a Postgres database, a Redis cache and an Nginx reverse proxy, wired together on isolated networks with named volumes, health checks and dependency ordering. The app talks to the database by service name, the proxy terminates traffic and serves the app, and data survives a full `docker compose down` and `up`. Done means the whole stack comes up with one command, the app serves traffic through the proxy, and a restart loses no data.",
    "skills": ["Docker Compose", "Multi-service architecture", "Postgres", "Redis", "Nginx reverse proxy", "Named volumes", "Container networks", "Health checks"],
    "language": "docker",
    "functionalRequirements": [
      "Define app, database, cache and reverse proxy services in one compose file",
      "Connect the app to Postgres using the service name as the hostname",
      "Add Redis as a cache the app reads before hitting the database",
      "Route all external traffic through Nginx as a reverse proxy",
      "Persist database data in a named volume that survives restarts",
      "Order startup with health checks so the app waits for a healthy database",
      "Pass secrets through an env file, never in the compose file",
      "Isolate the database on an internal network the proxy cannot reach"
    ],
    "nonFunctionalRequirements": [
      "The stack starts with a single `docker compose up -d`",
      "Data survives `docker compose down` and `up`",
      "The database is not exposed on a host port",
      "A failed service is restarted automatically",
      "Logs from all services are reachable with one command"
    ],
    "architecture": "Four services: app (Python web app), db (Postgres 16 with a named volume), cache (Redis with a capped memory volume) and proxy (Nginx forwarding to the app). Two networks: frontend (proxy + app) and backend (app + db + cache), so the database is unreachable from the proxy. Health checks gate startup via depends_on with condition: service_healthy. Configuration comes from a .env file, and Nginx serves as the single entry point on port 80.",
    "databaseSchema": "items: id SERIAL PK, title TEXT, created_at TIMESTAMPTZ; cache keys: item:{id} in Redis with a 60s TTL",
    "apis": [
      "CLI: docker compose up/down/ps/logs/exec, docker volume ls",
      "App: GET / — via proxy, GET /api/items — reads cache then Postgres, POST /api/items",
      "Proxy: Nginx listens on 80 and forwards / to app:8000"
    ],
    "fileStructure": "prod-stack/\n  docker-compose.yml\n  .env.example\n  app/\n    Dockerfile\n    main.py\n    requirements.txt\n  proxy/\n    nginx.conf\n  db/\n    init.sql\n  README.md",
    "taskBreakdown": [
      "Design the services, networks and volumes",
      "Write the compose file with health checks and ordering",
      "Wire the app to Postgres and Redis by service name",
      "Configure Nginx as the reverse proxy",
      "Add the env file and secrets handling",
      "Bring the stack up and test end to end",
      "Prove data survives restarts and rebuilds",
      "Document operations: logs, backup, reset and troubleshooting"
    ],
    "milestones": [
      {
        "id": "proj-docker-compose-prod-stack-m1",
        "order": 1,
        "title": "Compose file and service wiring",
        "objectives": ["Define the four services", "Create the two networks", "Wire the app to the database by service name"],
        "instructions": "Write docker-compose.yml with app, db, cache and proxy services. Put proxy and app on the frontend network and app, db and cache on the backend network. Configure the app's DATABASE_URL to use db as the hostname and REDIS_URL to use cache. Bring up db and cache first, then the app, and confirm the app can connect to both by service name.",
        "concepts": ["Service discovery", "Compose networks", "Environment variables"],
        "hints": ["Service names are DNS names inside the compose network.", "Keep the database off the frontend network.", "Use docker compose exec to test connectivity from inside a container."],
        "acceptanceCriteria": ["All four services are defined in one file", "The app connects to Postgres via the hostname db", "The app connects to Redis via the hostname cache", "docker compose ps shows all services running"],
        "tests": ["Ping db from inside the app container", "Connect to Redis from the app container", "List the compose networks"]
      },
      {
        "id": "proj-docker-compose-prod-stack-m2",
        "order": 2,
        "title": "Health checks and startup ordering",
        "objectives": ["Add health checks to db and cache", "Make the app wait for healthy dependencies", "Prove the ordering works from a cold start"],
        "instructions": "Add a pg_isready health check to the db service and a redis-cli ping check to cache, with sensible intervals and retries. Set the app's depends_on to condition: service_healthy for both. From a cold start, run docker compose up and watch the logs to prove the app starts only after the database is healthy, then deliberately break the database health check and confirm the app does not start.",
        "concepts": ["Health checks", "Startup ordering", "depends_on conditions"],
        "hints": ["depends_on without a condition only waits for the container to exist.", "Give the database a generous start_period.", "A health check must test the real service, not just the process."],
        "acceptanceCriteria": ["db and cache report healthy in docker compose ps", "The app starts after the database is healthy", "A broken database health check blocks the app", "Logs show the correct startup order"],
        "tests": ["Cold-start the stack and read the logs", "Break the db health check and restart", "Check health status with docker compose ps"]
      },
      {
        "id": "proj-docker-compose-prod-stack-m3",
        "order": 3,
        "title": "Reverse proxy and caching",
        "objectives": ["Route traffic through Nginx", "Add Redis caching to the app", "Verify cache hits"],
        "instructions": "Write proxy/nginx.conf to listen on port 80, proxy requests to app:8000, and pass the real client IP headers. Add Redis caching to the app's list endpoint: check the cache first, fall back to Postgres, and store the result with a 60-second TTL. Bring the stack up, curl the app through the proxy, and prove the second identical request is served from cache while the database sees only one query.",
        "concepts": ["Reverse proxies", "Cache-aside pattern", "TTL"],
        "hints": ["The proxy is the only service with a published host port.", "Log cache hits and misses so you can prove the cache works.", "Invalidate the cache key when an item is created."],
        "acceptanceCriteria": ["The app is reachable on host port 80 through Nginx", "A repeated request is served from Redis", "Creating an item invalidates the cached list", "No service except the proxy publishes a host port for the app"],
        "tests": ["curl the app via localhost:80", "Request the list twice and compare timings and logs", "Create an item and re-request the list"]
      },
      {
        "id": "proj-docker-compose-prod-stack-m4",
        "order": 4,
        "title": "Persistence, secrets and operations",
        "objectives": ["Persist data in named volumes", "Move secrets to an env file", "Document backup and recovery"],
        "instructions": "Confirm the database uses a named volume and Redis uses its own volume, then create data through the app, run docker compose down and up again, and verify the data is still there. Move every password into a .env file referenced with env_file, confirm no secret appears in the compose file, and verify docker compose config does not print secrets. Write the operations section of the README: viewing logs, backing up the volume, and resetting the stack.",
        "concepts": ["Named volumes", "Secret management", "Backup and restore"],
        "hints": ["Anonymous volumes are lost on recreate; named volumes survive.", "Keep .env out of Git and ship a .env.example instead.", "Back up the volume, not just the container."],
        "acceptanceCriteria": ["Data survives docker compose down and up", "No password appears in docker-compose.yml", ".env is gitignored and .env.example documents every variable", "The README documents logs, backup and reset"],
        "tests": ["Create data, down/up the stack, and check the data", "Grep the compose file for passwords", "Back up the volume and restore it into a fresh stack"]
      }
    ],
    "reviewChecklist": [
      "One command brings up the whole stack",
      "Services talk by name on isolated networks",
      "Startup ordering is enforced by health checks",
      "Data survives restarts in named volumes",
      "Secrets live only in the env file"
    ],
    "finalAssessment": [
      "Bring the stack up from scratch with one command",
      "Show traffic flowing through the proxy to the app",
      "Prove a request is served from Redis cache",
      "Restart the stack and show the data is intact",
      "Show the database is unreachable from outside the backend network"
    ]
  },
  {
    "id": "proj-ansible-web-server",
    "slug": "ansible-web-server",
    "level": 2,
    "title": "Automate a Web Server with Ansible",
    "description": "Automate the full setup of a web server with Ansible: a playbook and roles that install Nginx, deploy a static site, configure the firewall and TLS-ready virtual host, and enable the service — idempotently, so running it twice changes nothing the second time. The target is a local VM or container lab host, and the whole setup is driven by variables so the same roles can serve a second site. Done means a fresh host goes from bare OS to a serving website with one `ansible-playbook` command, and a re-run reports zero changes.",
    "skills": ["Ansible", "Playbooks", "Roles", "Inventory", "Idempotency", "Nginx", "Jinja2 templates", "Variables"],
    "language": "ansible",
    "functionalRequirements": [
      "Define an inventory with web server hosts grouped by environment",
      "Install and enable Nginx through a role, not ad-hoc commands",
      "Deploy a static site from a Jinja2 template with variables for domain and title",
      "Configure the firewall to allow HTTP/HTTPS and block everything else",
      "Render the Nginx virtual host from a template and test the config before reload",
      "Enable and start the Nginx service and verify it serves the site",
      "Make the playbook fully idempotent: a second run reports zero changes",
      "Support deploying a second site by changing only variables"
    ],
    "nonFunctionalRequirements": [
      "A re-run changes nothing (zero changed tasks)",
      "No task uses shell commands where a module exists",
      "Secrets are stored in Ansible Vault, never in plain text",
      "The playbook runs in check mode without error to preview changes",
      "The same roles work against a second host without modification"
    ],
    "architecture": "The project is a standard Ansible layout: inventory/hosts.ini with web and environment groups, group_vars for shared settings, roles/nginx (install, configure, service) and roles/website (deploy files, render templates), and a site.yml playbook that applies both roles to the web group. Handlers reload Nginx only when configuration changes. Variables drive the domain, document root and site title; Vault holds any secrets.",
    "databaseSchema": "",
    "apis": [
      "CLI: ansible-playbook site.yml --check, ansible-playbook site.yml, ansible-inventory --list",
      "CLI: ansible-vault create/edit for secrets",
      "Modules: apt/dnf, template, copy, service, ufw/firewalld, file"
    ],
    "fileStructure": "ansible-web-server/\n  site.yml\n  inventory/\n    hosts.ini\n  group_vars/\n    all.yml\n    web.yml\n  roles/\n    nginx/\n      tasks/main.yml\n      handlers/main.yml\n      templates/vhost.conf.j2\n    website/\n      tasks/main.yml\n      templates/index.html.j2\n  README.md",
    "taskBreakdown": [
      "Set up the inventory and a lab target host",
      "Write the nginx role to install and enable the service",
      "Render the virtual host from a Jinja2 template",
      "Write the website role to deploy the site",
      "Add the firewall configuration",
      "Prove idempotency with a second run and check mode",
      "Deploy a second site using only variables",
      "Document the runbook and the Vault workflow"
    ],
    "milestones": [
      {
        "id": "proj-ansible-web-server-m1",
        "order": 1,
        "title": "Inventory and first connection",
        "objectives": ["Write the inventory", "Connect to the lab host", "Run an ad-hoc ping and fact gathering"],
        "instructions": "Create inventory/hosts.ini with a web group containing your lab host and group_vars/all.yml with the domain and site title. Verify connectivity with ansible web -m ping and gather facts to confirm the OS family, so later tasks can branch on it. Fix SSH and privilege escalation issues before writing any roles.",
        "concepts": ["Inventory", "Groups", "Facts"],
        "hints": ["Start with ansible -m ping before any playbook.", "Use ansible_user and become in the inventory, not in every task.", "Facts let one playbook serve Debian and RHEL hosts."],
        "acceptanceCriteria": ["ansible web -m ping succeeds", "Facts show the correct OS family", "The inventory lists the host under the web group", "Privilege escalation works without a password prompt failing the run"],
        "tests": ["Run ansible web -m ping", "Run ansible web -m setup and inspect the OS facts", "Run ansible-inventory --list"]
      },
      {
        "id": "proj-ansible-web-server-m2",
        "order": 2,
        "title": "Nginx role and virtual host",
        "objectives": ["Install Nginx with a module", "Render the vhost from a template", "Reload only on change via a handler"],
        "instructions": "Write roles/nginx with tasks that install Nginx using the package module, render templates/vhost.conf.j2 with the domain and document root variables, enable the site, validate the config with nginx -t, and notify a handler that reloads Nginx. Run the playbook and confirm the default Nginx page is replaced by your vhost responding on the domain.",
        "concepts": ["Roles", "Templates", "Handlers"],
        "hints": ["Use the package module so the role works across OS families.", "Handlers run once at the end, only when notified.", "Validate the config before the reload, not after."],
        "acceptanceCriteria": ["Nginx is installed and enabled", "The vhost serves the configured domain", "nginx -t passes", "A run with no changes does not reload Nginx"],
        "tests": ["Run the playbook and curl the domain", "Run it again and check the handler did not fire", "Break the template and confirm the run fails before reload"]
      },
      {
        "id": "proj-ansible-web-server-m3",
        "order": 3,
        "title": "Website role and firewall",
        "objectives": ["Deploy the site from a template", "Open only HTTP/HTTPS in the firewall", "Verify the site end to end"],
        "instructions": "Write roles/website to deploy index.html from a Jinja2 template with the site title variable and set correct ownership and permissions. Add firewall tasks that allow HTTP and HTTPS and deny other inbound traffic, using the firewall module for the host OS. Run site.yml end to end and confirm the page loads with the right title and the firewall shows only the expected rules.",
        "concepts": ["Templating", "Firewall modules", "File permissions"],
        "hints": ["Template variables make the same role deploy a second site.", "Check the firewall rules from outside the host, not just in the playbook.", "Set ownership explicitly; defaults vary by OS."],
        "acceptanceCriteria": ["The site serves the templated title", "The firewall allows 80/443 and nothing else inbound", "File ownership and permissions are correct", "site.yml completes with no failures"],
        "tests": ["curl the site and check the title", "List firewall rules on the host", "Check file ownership in the document root"]
      },
      {
        "id": "proj-ansible-web-server-m4",
        "order": 4,
        "title": "Idempotency, check mode and second site",
        "objectives": ["Prove a second run changes nothing", "Preview changes with check mode", "Deploy a second site by variables only"],
        "instructions": "Run the playbook a second time and confirm every task reports ok with zero changed. Run it with --check --diff to preview what a change would look like, then change the site title variable and confirm check mode shows only the template diff. Finally, add a second host or a second vhost by adding inventory and variables only — no role changes — and deploy it.",
        "concepts": ["Idempotency", "Check mode", "Reusability"],
        "hints": ["Changed=0 on a re-run is the idempotency proof.", "Check mode is the dry-run you run before every real change.", "If the second site needs a role edit, the role was not generic enough."],
        "acceptanceCriteria": ["A re-run reports zero changed tasks", "Check mode previews the title change as a diff", "The second site deploys with variables only", "The playbook uses no shell module where a module exists"],
        "tests": ["Run the playbook twice and compare changed counts", "Run with --check --diff after a variable change", "Deploy the second site and curl it"]
      }
    ],
    "reviewChecklist": [
      "The playbook is idempotent with zero changes on re-run",
      "Roles are generic and driven by variables",
      "Config is validated before any reload",
      "The firewall allows only HTTP and HTTPS",
      "No shell module is used where a module exists"
    ],
    "finalAssessment": [
      "Run the playbook against a fresh host and show the site live",
      "Run it again and show zero changes",
      "Preview a change with check mode and diff",
      "Deploy a second site using only variables",
      "Break the template and show the run failing safely"
    ]
  },
  {
    "id": "proj-ansible-patching",
    "slug": "ansible-patching",
    "level": 3,
    "title": "Fleet Patching with Ansible",
    "description": "Patch a fleet of servers the way a real operations team does: rolling updates in waves, pre-checks that prove each host is healthy before touching it, post-checks that prove it still works after, and automatic rollback when a check fails. The playbook patches one wave at a time, waits for hosts to come back after a reboot, and aborts the whole run if too many hosts fail. Done means the fleet is fully patched with zero downtime for the service, every host has a before/after record, and a failed host is rolled back without taking the fleet down with it.",
    "skills": ["Ansible", "Rolling updates", "OS patching", "Pre/post checks", "Reboots", "Rollback", "Serial execution", "Failure handling"],
    "language": "ansible",
    "functionalRequirements": [
      "Patch all hosts in the fleet with the OS package manager",
      "Run pre-checks on every host (disk space, service health, backup present)",
      "Patch in waves using serial execution so only a fraction is down at once",
      "Reboot only hosts that need it and wait for them to return",
      "Run post-checks after patching (services up, app responding, no failed units)",
      "Roll back a host automatically when its post-checks fail",
      "Abort the run when failures exceed a configurable threshold",
      "Record a before/after report per host with package counts and versions"
    ],
    "nonFunctionalRequirements": [
      "At most one wave is unavailable at any time",
      "A failed host never blocks the remaining waves unless the abort threshold is hit",
      "No patch runs on a host that fails its pre-checks",
      "The full run is resumable: completed waves are not re-patched",
      "Every action is logged per host for audit"
    ],
    "architecture": "One patch.yml playbook runs against the fleet group with serial set to a wave size (for example 25%). It has three plays: pre-checks that gather disk, service and backup status and fail fast on problems; patching that updates packages, records the reboot requirement, reboots with the reboot module and waits for the host; and post-checks that verify services and the application endpoint, with a rescue block that restores the previous kernel or snapshot and a max_fail_percentage that aborts the run. A callback plugin writes a per-host report.",
    "databaseSchema": "",
    "apis": [
      "CLI: ansible-playbook patch.yml, ansible-playbook patch.yml --limit wave1, ansible-playbook patch.yml --check",
      "Modules: package/dnf/apt, reboot, service, uri, assert, block/rescue/always",
      "Report: reports/patch-<date>.md generated per run"
    ],
    "fileStructure": "fleet-patching/\n  patch.yml\n  inventory/\n    hosts.ini\n  group_vars/\n    all.yml\n  roles/\n    precheck/\n    patching/\n    postcheck/\n    rollback/\n  reports/\n  README.md",
    "taskBreakdown": [
      "Inventory the fleet and group hosts into waves",
      "Write the pre-check role and its failure rules",
      "Write the patching role with reboot handling",
      "Write the post-check role and the rollback rescue block",
      "Add serial waves and the abort threshold",
      "Test on a canary host, then one wave, then the fleet",
      "Generate the before/after report",
      "Document the patching runbook and the rollback procedure"
    ],
    "milestones": [
      {
        "id": "proj-ansible-patching-m1",
        "order": 1,
        "title": "Inventory, waves and pre-checks",
        "objectives": ["Group the fleet into waves", "Write pre-checks that fail fast", "Dry-run the pre-checks across the fleet"],
        "instructions": "Build the inventory with the fleet group and wave subgroups, and set serial to 25% in the playbook. Write the precheck role: at least 2 GB free disk, the application service running, a recent backup present, and no already-pending reboot flag. Run the playbook in check mode and then the pre-check play alone, and confirm a host with a full disk or a stopped service is excluded before any patching starts.",
        "concepts": ["Serial execution", "Pre-flight checks", "Fail fast"],
        "hints": ["Pre-checks are the cheapest place to catch a bad host.", "Use assert with a clear message for each check.", "Test the checks by deliberately breaking one host first."],
        "acceptanceCriteria": ["The fleet is grouped into waves", "Pre-checks cover disk, service and backup", "A host failing a pre-check is skipped before patching", "Check mode runs clean across the fleet"],
        "tests": ["Run pre-checks against the full fleet", "Fill a disk on one host and re-run pre-checks", "Run the playbook in check mode"]
      },
      {
        "id": "proj-ansible-patching-m2",
        "order": 2,
        "title": "Patching with reboot handling",
        "objectives": ["Update packages idempotently", "Reboot only when required", "Wait for hosts to return"],
        "instructions": "Write the patching role using the package module to update all packages, then check the reboot-required flag and reboot only when it is set, using the reboot module with a timeout and a test command that confirms SSH is back. Patch a single canary host first and verify it returns healthy, then patch one full wave and confirm the other waves stayed up throughout.",
        "concepts": ["Package updates", "Conditional reboots", "Wait-for-return"],
        "hints": ["Rebooting every host wastes time; reboot only when the flag says so.", "The reboot module waits for the host — do not poll with shell loops.", "Patch the canary first, always."],
        "acceptanceCriteria": ["The canary patches and returns healthy", "Hosts without a reboot flag are not rebooted", "One wave patches while the others keep serving", "The run records which hosts rebooted"],
        "tests": ["Patch the canary and verify its uptime reset", "Patch one wave and check the others stayed up", "Confirm a no-reboot host was not rebooted"]
      },
      {
        "id": "proj-ansible-patching-m3",
        "order": 3,
        "title": "Post-checks and automatic rollback",
        "objectives": ["Verify services and the app after patching", "Roll back a failed host automatically", "Keep the failure contained to its wave"],
        "instructions": "Write the postcheck role: all expected services active, the application endpoint returning 200, and no failed systemd units. Wrap the patching and post-checks in a block with a rescue section that restores the previous kernel or snapshot and a post-check re-run, and an always section that writes the host's result. Test it by patching a host whose post-check is deliberately broken and confirm it rolls back while the rest of the wave continues.",
        "concepts": ["Block/rescue/always", "Post-checks", "Blast radius"],
        "hints": ["Rollback must be tested, not assumed — break a host on purpose.", "The rescue block runs only for that host, not the wave.", "Always write the result, success or failure."],
        "acceptanceCriteria": ["Post-checks verify services, endpoint and systemd units", "A failing host rolls back automatically", "A rollback in one host does not stop its wave", "Every host has a recorded result"],
        "tests": ["Break a post-check on one host and patch it", "Verify the host is back on its previous state", "Confirm the rest of the wave patched normally"]
      },
      {
        "id": "proj-ansible-patching-m4",
        "order": 4,
        "title": "Full fleet run, abort threshold and report",
        "objectives": ["Patch the full fleet in waves", "Abort when failures exceed the threshold", "Produce the before/after report"],
        "instructions": "Set max_fail_percentage to a value such as 25% and run the full playbook across all waves, watching one wave at a time. Generate the report with per-host package counts before and after, reboot status, post-check results and any rollbacks. Then simulate a mass failure (for example, a bad package source on many hosts) and confirm the run aborts before the next wave starts, leaving later waves untouched.",
        "concepts": ["Abort thresholds", "Reporting", "Fleet operations"],
        "hints": ["The abort threshold is what turns a bad day into a contained incident.", "The report is the audit trail — keep it with the run date.", "A run that aborts cleanly is a success, not a failure."],
        "acceptanceCriteria": ["The full fleet patches with at most one wave down at a time", "The report covers every host with before/after data", "A mass failure aborts the run before the next wave", "Untouched waves show no changes after an abort"],
        "tests": ["Run the full fleet patch and read the report", "Simulate a mass failure and watch the abort", "Verify later waves were not touched after the abort"]
      }
    ],
    "reviewChecklist": [
      "Pre-checks gate every host before patching",
      "Only one wave is down at a time",
      "Post-checks verify the service, not just the packages",
      "Failures roll back automatically and abort thresholds work",
      "Every host has a before/after record"
    ],
    "finalAssessment": [
      "Patch a canary, then one wave, then the fleet",
      "Show a host failing pre-checks being skipped",
      "Break a post-check and show the automatic rollback",
      "Trigger the abort threshold and show later waves untouched",
      "Present the before/after report for the whole fleet"
    ]
  },
  {
    "id": "proj-ansible-roles-platform",
    "slug": "ansible-roles-platform",
    "level": 4,
    "title": "Build a Reusable Ansible Roles Platform",
    "description": "Build the shared Ansible platform a whole organisation consumes: a collection of tested, versioned, documented roles — for example base hardening, users, logging and web server — published as a collection that other teams install and pin like a dependency. Each role ships with defaults, Molecule-style tests, and docs, and a CI pipeline runs syntax checks, linting, dry-runs and idempotency tests on every change. Done means a second team can install the collection, pin a version, and configure a server using only your roles, and a breaking change to a role is caught by tests before it ships.",
    "skills": ["Ansible collections", "Role design", "Molecule testing", "Ansible Lint", "Semantic versioning", "Galaxy publishing", "CI pipelines", "Documentation"],
    "language": "ansible",
    "functionalRequirements": [
      "Build at least four reusable roles (base, users, logging, webserver)",
      "Package the roles as an Ansible collection with a galaxy.yml",
      "Give every role documented defaults, variables and a README with examples",
      "Test every role with syntax check, lint, dry-run and idempotency checks",
      "Version the collection with semantic versioning and a changelog",
      "Publish the collection so other teams can install and pin a version",
      "Let consumers override any default without editing the role",
      "Run the full test suite in CI on every pull request"
    ],
    "nonFunctionalRequirements": [
      "No role is specific to one team or one host",
      "Every variable has a default and a documented type",
      "A new version never breaks consumers without a major bump",
      "Tests run against containers so they are fast and repeatable",
      "The collection installs with a single command"
    ],
    "architecture": "The repository is an Ansible collection (myorg.platform) with roles/base, roles/users, roles/logging and roles/webserver, each with tasks, handlers, defaults, vars, templates and meta. A molecule directory per role defines container-based test scenarios (converge, idempotency, verify). CI runs ansible-lint, yamllint, molecule test and a docs check on every PR; releases are cut by tagging, which builds and publishes the collection artifact with a changelog entry.",
    "databaseSchema": "",
    "apis": [
      "CLI: ansible-galaxy collection build/install, ansible-lint, molecule test, ansible-playbook --check",
      "Collection: myorg.platform.base, myorg.platform.users, myorg.platform.logging, myorg.platform.webserver",
      "CI: GitHub Actions workflow running lint, molecule and docs checks"
    ],
    "fileStructure": "ansible-roles-platform/\n  galaxy.yml\n  README.md\n  CHANGELOG.md\n  roles/\n    base/\n    users/\n    logging/\n    webserver/\n  molecule/\n    base/\n    users/\n  .github/\n    workflows/\n      ci.yml\n  docs/\n    usage.md",
    "taskBreakdown": [
      "Design the collection layout and the four roles",
      "Write the base and users roles with documented defaults",
      "Write the logging and webserver roles",
      "Add Molecule tests for each role",
      "Wire CI with lint, dry-run and idempotency checks",
      "Version, changelog and publish the collection",
      "Consume the collection from a second project",
      "Document the platform and the contribution guide"
    ],
    "milestones": [
      {
        "id": "proj-ansible-roles-platform-m1",
        "order": 1,
        "title": "Collection layout and the base role",
        "objectives": ["Scaffold the collection", "Write the base role", "Document every variable"],
        "instructions": "Create the collection skeleton with galaxy.yml (namespace, name, version, description) and roles/base that sets the hostname, timezone, installs common packages and configures SSH hardening. Give every variable a default in defaults/main.yml and document it in roles/base/README.md with types and examples. Build the collection locally and confirm it installs.",
        "concepts": ["Collections", "Role defaults", "Galaxy metadata"],
        "hints": ["Defaults are the consumer's override surface — document all of them.", "Keep the base role small; it runs on every host.", "The README is part of the role, not an afterthought."],
        "acceptanceCriteria": ["The collection builds with ansible-galaxy", "The base role configures a test container", "Every variable is documented with a type", "The role README shows a working example"],
        "tests": ["Build the collection artifact", "Install it and list its contents", "Apply the base role to a test container"]
      },
      {
        "id": "proj-ansible-roles-platform-m2",
        "order": 2,
        "title": "Users, logging and webserver roles",
        "objectives": ["Write the users role", "Write the logging role", "Write the webserver role"],
        "instructions": "Add roles/users that creates accounts from a list variable, manages SSH keys and sudo rules; roles/logging that installs and configures a log shipper to a configurable endpoint; and roles/webserver that installs Nginx and deploys a vhost. Each role must work standalone and compose with the others in one playbook, with all behaviour driven by variables and no hardcoded team names or hostnames.",
        "concepts": ["Role composition", "List-driven configuration", "Separation of concerns"],
        "hints": ["A role that needs another role's variables is coupled — pass data via the playbook.", "Loop over lists, never write one task per user.", "Test each role alone before composing them."],
        "acceptanceCriteria": ["Each role works standalone in a container", "All three compose in one playbook", "No role hardcodes a team or hostname", "Users, logging and webserver all verify end to end"],
        "tests": ["Apply each role alone to a fresh container", "Apply all four roles in one playbook", "Create two users and verify their SSH keys"]
      },
      {
        "id": "proj-ansible-roles-platform-m3",
        "order": 3,
        "title": "Molecule tests and CI gates",
        "objectives": ["Add Molecule scenarios per role", "Prove idempotency in tests", "Gate PRs in CI"],
        "instructions": "Add a Molecule scenario per role that converges the role in a container, runs it a second time to prove idempotency, and runs verify checks (service running, user exists, log shipper configured). Add ansible-lint and yamllint, then write the CI workflow that runs lint and molecule test on every PR. Open a PR that breaks idempotency and confirm CI catches it.",
        "concepts": ["Molecule", "Idempotency testing", "Linting"],
        "hints": ["The second converge must report zero changes.", "Verify checks test the outcome, not the task list.", "CI should be fast enough that people do not skip it."],
        "acceptanceCriteria": ["Every role has a passing Molecule scenario", "Second converge reports zero changes", "CI runs lint and tests on every PR", "A deliberately non-idempotent change fails CI"],
        "tests": ["Run molecule test for each role", "Introduce a non-idempotent task and watch CI fail", "Run ansible-lint across the collection"]
      },
      {
        "id": "proj-ansible-roles-platform-m4",
        "order": 4,
        "title": "Versioning, publishing and consumption",
        "objectives": ["Cut a 1.0.0 release with a changelog", "Publish the collection", "Consume it from a second project"],
        "instructions": "Write the changelog, tag v1.0.0, build the collection artifact and publish it to Galaxy or a local Galaxy server. In a separate consumer project, install the collection with a pinned version in requirements.yml, write a playbook that uses only your roles to configure a server, and run it. Then make a breaking change, release it as 2.0.0, and show the consumer still on 1.0.0 is unaffected until it chooses to upgrade.",
        "concepts": ["Semantic versioning", "Publishing", "Dependency pinning"],
        "hints": ["A breaking change without a major bump breaks trust.", "The changelog is the upgrade guide.", "Pin versions in consumers; floating versions are surprises."],
        "acceptanceCriteria": ["Version 1.0.0 is published with a changelog", "A consumer installs and pins the collection", "The consumer playbook uses only platform roles", "A 2.0.0 breaking change does not affect the pinned consumer"],
        "tests": ["Install the pinned collection in a fresh project", "Run the consumer playbook end to end", "Publish 2.0.0 and confirm the pinned consumer is unchanged"]
      }
    ],
    "reviewChecklist": [
      "Four roles are generic, documented and tested",
      "Every role is idempotent under Molecule",
      "CI gates every PR with lint and tests",
      "Versions follow semver with a changelog",
      "A second team can consume the collection by pinning a version"
    ],
    "finalAssessment": [
      "Show the collection layout and explain each role",
      "Run Molecule tests and show the idempotency proof",
      "Break a role and show CI catching it",
      "Publish a release and install it in a consumer project",
      "Demonstrate a major-version upgrade path for consumers"
    ]
  },
  {
    "id": "proj-git-team-workflow",
    "slug": "git-team-workflow",
    "level": 2,
    "title": "Team Git Workflow",
    "description": "Run a small team's Git workflow end to end: a branching strategy with short-lived feature branches, pull requests with reviews, protected main, and clean merges for a team shipping a feature together. The team works on one shared repository, reviews each other's code, resolves a merge conflict, and ships the feature without ever pushing directly to main. Done means the feature lands on main through a reviewed PR, the history is readable, and the team can explain what each branch and rule is for.",
    "skills": ["Git branching", "Pull requests", "Code review", "Merge conflicts", "Branch protection", "Commit hygiene", "GitHub workflow", "Team collaboration"],
    "language": "git",
    "functionalRequirements": [
      "Set up a shared repository with a protected main branch",
      "Create short-lived feature branches from main for each piece of work",
      "Open pull requests with a description, checklist and reviewers",
      "Require at least one approving review before merging",
      "Resolve a merge conflict during the feature work",
      "Keep commits small, focused and written with clear messages",
      "Merge the feature with a merge commit or squash, consistently",
      "Delete merged branches and keep the branch list clean"
    ],
    "nonFunctionalRequirements": [
      "Nobody pushes directly to main",
      "Every change on main comes through a reviewed pull request",
      "No merge conflict is resolved by discarding the other person's work",
      "The history shows who changed what and why",
      "The workflow is documented so a new teammate can follow it"
    ],
    "architecture": "The workflow is GitHub Flow on a single repository: main is protected (no direct pushes, required PR, required review, required status checks), feature branches are named feature/<short-name> and live at most a few days, and each PR gets a template with a description and checklist. Developers rebase their branch on main before merging to keep conflicts small, and the merge uses a consistent strategy recorded in the contributing guide.",
    "databaseSchema": "",
    "apis": [
      "CLI: git branch, git checkout -b, git push, git pull --rebase, git merge, git log --graph",
      "GitHub: branch protection settings, PR templates, review requests",
      "Docs: CONTRIBUTING.md with the workflow rules"
    ],
    "fileStructure": "team-workflow/\n  README.md\n  CONTRIBUTING.md\n  .github/\n    PULL_REQUEST_TEMPLATE.md\n  src/\n    app.py\n  tests/\n    test_app.py",
    "taskBreakdown": [
      "Create the repo and protect main",
      "Write the contributing guide and PR template",
      "Split the feature into branches and assign work",
      "Open PRs, review and request changes",
      "Resolve a merge conflict together",
      "Merge the feature and clean up branches",
      "Review the final history as a team",
      "Retro the workflow and record improvements"
    ],
    "milestones": [
      {
        "id": "proj-git-team-workflow-m1",
        "order": 1,
        "title": "Repository setup and branch protection",
        "objectives": ["Create the shared repository", "Protect main", "Write the contributing guide"],
        "instructions": "Create the repository with a README and a small app, then turn on branch protection for main: require a pull request, require one approving review, require status checks to pass, and block direct pushes. Write CONTRIBUTING.md explaining the branch naming, PR process and merge strategy, and the PR template with a description and checklist. Verify a direct push to main is rejected.",
        "concepts": ["Branch protection", "Contributing guides", "PR templates"],
        "hints": ["Protection rules are the workflow's enforcement.", "A new teammate should learn the workflow from CONTRIBUTING.md alone.", "Test the protection by trying the forbidden push."],
        "acceptanceCriteria": ["Main rejects direct pushes", "A PR needs one approving review to merge", "CONTRIBUTING.md documents the workflow", "The PR template appears on new PRs"],
        "tests": ["Attempt a direct push to main and record the rejection", "Open a PR and check the template", "Check the branch protection settings"]
      },
      {
        "id": "proj-git-team-workflow-m2",
        "order": 2,
        "title": "Feature branches and pull requests",
        "objectives": ["Create feature branches", "Write focused commits", "Open reviewed PRs"],
        "instructions": "Split the feature into two or three pieces and create a branch per piece from an up-to-date main. Work in small commits with messages in the imperative mood, push the branch, and open a PR using the template with a clear description and screenshots or test output where relevant. Request a review from a teammate and respond to their comments with new commits, not force-pushes over the discussion.",
        "concepts": ["Feature branches", "Atomic commits", "Review etiquette"],
        "hints": ["A commit should do one thing and be reviewable alone.", "Push early so teammates can see work in progress.", "Reply to review comments with commits, keeping the history."],
        "acceptanceCriteria": ["Each piece of work has its own branch", "Commits are small with clear messages", "Each PR has a description and a checklist", "Reviews are requested and addressed"],
        "tests": ["List branches and inspect their commits", "Read the PR descriptions", "Check that review comments were resolved"]
      },
      {
        "id": "proj-git-team-workflow-m3",
        "order": 3,
        "title": "Merge conflicts and rebasing",
        "objectives": ["Create a real merge conflict", "Resolve it correctly", "Rebase onto main before merging"],
        "instructions": "Have two branches touch the same lines so a conflict occurs when the second one rebases onto the updated main. Resolve it by reading both changes and keeping the intent of each, never by accepting one side wholesale. Run the tests after resolving, rebase the branch onto main, and push the result. Record what the conflict was and how it was resolved in the PR.",
        "concepts": ["Merge conflicts", "Rebasing", "Conflict resolution"],
        "hints": ["Resolve conflicts with understanding, not with --ours or --theirs.", "Always run the tests after resolving a conflict.", "Rebase keeps the history linear and the conflict small."],
        "acceptanceCriteria": ["A genuine conflict is resolved with both changes preserved", "Tests pass after the resolution", "The branch is rebased onto current main", "The resolution is explained in the PR"],
        "tests": ["Inspect the resolved file for both changes", "Run the test suite on the rebased branch", "Read the PR's conflict explanation"]
      },
      {
        "id": "proj-git-team-workflow-m4",
        "order": 4,
        "title": "Merge, cleanup and retrospective",
        "objectives": ["Merge the feature through review", "Clean up branches", "Review the history and retro the workflow"],
        "instructions": "Once each PR has an approval and green checks, merge it using the agreed strategy and confirm the feature works on main. Delete the merged branches locally and remotely, then run git log --graph to review the final history as a team: it should read as a story of the feature. Hold a short retro and write down one workflow improvement to try next time.",
        "concepts": ["Merge strategies", "Branch cleanup", "Retrospectives"],
        "hints": ["Use the same merge strategy every time.", "Delete branches promptly or the list rots.", "The history is documentation — read it together."],
        "acceptanceCriteria": ["The feature is on main via reviewed PRs only", "All merged branches are deleted", "The history graph is clean and readable", "One retro improvement is recorded"],
        "tests": ["Check main contains the feature and the tests pass", "List branches and confirm cleanup", "Read git log --graph as a team"]
      }
    ],
    "reviewChecklist": [
      "Main was never pushed to directly",
      "Every merge went through a reviewed PR",
      "Commits are small and messages are clear",
      "The conflict was resolved preserving both sides",
      "Branches are cleaned up after merging"
    ],
    "finalAssessment": [
      "Show the protected main settings and a rejected direct push",
      "Walk through a PR from draft to approval to merge",
      "Explain the merge conflict and its resolution",
      "Read the final history graph aloud as a story",
      "Name one workflow improvement from the retro"
    ]
  },
  {
    "id": "proj-git-release-train",
    "slug": "git-release-train",
    "level": 3,
    "title": "Release Train & Versioning",
    "description": "Run a release train for a small product: release branches cut from main on a schedule, semantic versioning, annotated tags, generated changelogs, and a hotfix flow that patches production without derailing the next release. The train leaves on time whether or not a feature is ready — unfinished work waits for the next train. Done means version 1.2.0 ships from a release branch with a changelog, a hotfix 1.2.1 follows the same process, and anyone can trace any release back to its exact commit.",
    "skills": ["Semantic versioning", "Release branches", "Git tags", "Changelogs", "Hotfixes", "Cherry-picking", "Release scheduling", "GitHub releases"],
    "language": "git",
    "functionalRequirements": [
      "Cut a release branch from main on a fixed schedule",
      "Version releases with semantic versioning (major.minor.patch)",
      "Tag each release with an annotated, signed tag",
      "Generate a changelog from merged PRs grouped by feature, fix and breaking change",
      "Freeze the release branch: only fixes land there, features wait",
      "Ship a hotfix from the release tag through its own branch and patch release",
      "Merge the release and hotfix branches back to main",
      "Publish a GitHub release with notes and the changelog for every version"
    ],
    "nonFunctionalRequirements": [
      "Every release is traceable to one exact commit via its tag",
      "No feature lands on a frozen release branch",
      "A hotfix never waits for the next scheduled release",
      "The changelog is accurate and complete for every release",
      "Version numbers never go backwards"
    ],
    "architecture": "The train runs on a two-week cadence: main is the development line, release/vX.Y branches are cut from main and frozen, and tags vX.Y.Z mark releases. A changelog is generated from conventional-commit messages or PR labels, grouped into Added, Fixed and Breaking. Hotfixes branch from the latest release tag, merge into both the release branch and main, and ship as a patch version. GitHub Releases publish the tag with the changelog as notes.",
    "databaseSchema": "",
    "apis": [
      "CLI: git branch release/v1.2.0, git tag -a v1.2.0 -m, git cherry-pick, git log --oneline v1.1.0..v1.2.0",
      "Tools: changelog generator from conventional commits or PR labels",
      "GitHub: Releases page per tag with notes"
    ],
    "fileStructure": "release-train/\n  CHANGELOG.md\n  VERSION\n  docs/\n    release-process.md\n  scripts/\n    changelog.sh\n    cut-release.sh\n  src/\n    app.py",
    "taskBreakdown": [
      "Document the release process and cadence",
      "Adopt conventional commits or PR labels for changelog generation",
      "Cut the first release branch and freeze it",
      "Tag and publish the release with a changelog",
      "Handle a late feature that misses the train",
      "Ship a hotfix through the patch flow",
      "Merge release and hotfix branches back to main",
      "Retro the train and tighten the process"
    ],
    "milestones": [
      {
        "id": "proj-git-release-train-m1",
        "order": 1,
        "title": "Release process and versioning rules",
        "objectives": ["Document the cadence and rules", "Adopt conventional commits", "Set up the changelog generator"],
        "instructions": "Write docs/release-process.md: a release every two weeks, release branches named release/vX.Y, semver rules for major/minor/patch, and the hotfix policy. Adopt conventional commit prefixes (feat:, fix:, breaking:) or PR labels, and set up a changelog script that groups them. Tag the current main as v1.1.0 as the baseline and confirm git describe works from it.",
        "concepts": ["Semantic versioning", "Conventional commits", "Release cadence"],
        "hints": ["The changelog is only as good as the commit discipline.", "Write the process down before the first release, not after.", "A baseline tag makes the first changelog diff meaningful."],
        "acceptanceCriteria": ["The release process is documented", "Commits follow the conventional format", "The changelog script generates grouped entries", "A baseline tag v1.1.0 exists"],
        "tests": ["Generate a changelog from recent commits", "Check git describe reports the baseline tag", "Review the process doc with the team"]
      },
      {
        "id": "proj-git-release-train-m2",
        "order": 2,
        "title": "Cut and ship release 1.2.0",
        "objectives": ["Cut the release branch", "Freeze it to fixes only", "Tag and publish the release"],
        "instructions": "Cut release/v1.2.0 from main, then merge two features and one fix into main after the cut to prove the freeze: only the fix may be cherry-picked to the release branch, and the features wait. Fix a bug found in release testing on the release branch, merge it back to main, tag v1.2.0 as an annotated tag, generate the changelog, and publish the GitHub release with the notes.",
        "concepts": ["Release branches", "Freeze discipline", "Annotated tags"],
        "hints": ["The freeze is the discipline: features wait for the next train.", "Cherry-pick fixes, never merge main into the release branch.", "The tag is the release; the branch is just the workspace."],
        "acceptanceCriteria": ["Release branch contains only the fix, not the later features", "The release-branch fix is also on main", "Tag v1.2.0 is annotated and points at the release commit", "The published release has a complete changelog"],
        "tests": ["Compare the release branch against main for the two features", "Verify the tag and its annotation", "Read the published release notes"]
      },
      {
        "id": "proj-git-release-train-m3",
        "order": 3,
        "title": "Hotfix 1.2.1 without derailing the train",
        "objectives": ["Branch the hotfix from the release tag", "Ship a patch release", "Merge the hotfix everywhere it belongs"],
        "instructions": "Simulate a production bug in v1.2.0: create hotfix/fix-login from the v1.2.0 tag, fix it, and merge it into the release branch and into main. Tag v1.2.1 from the release branch, publish it with a changelog entry, and confirm main now contains the fix while the next release branch (already cut from the old main) gets the fix cherry-picked. Verify the version numbers never went backwards.",
        "concepts": ["Hotfixes", "Cherry-picking", "Patch versions"],
        "hints": ["A hotfix branches from the tag, never from main.", "Merge it to main first, then cherry-pick where needed.", "The patch version is the smallest, fastest release you ship."],
        "acceptanceCriteria": ["The hotfix branches from the v1.2.0 tag", "v1.2.1 is tagged and published", "Main contains the hotfix", "The next release branch receives the fix", "Versions increase monotonically"],
        "tests": ["Trace v1.2.1 back to its tag and commit", "Check main contains the fix", "List tags in order and verify the sequence"]
      },
      {
        "id": "proj-git-release-train-m4",
        "order": 4,
        "title": "Release retrospective and automation",
        "objectives": ["Review the train end to end", "Automate the repetitive steps", "Record process improvements"],
        "instructions": "Walk the whole history from v1.1.0 to v1.2.1 with the team: every tag, branch and merge, and the changelog for each release. Automate the repetitive parts with scripts/cut-release.sh (branch, version bump, changelog draft) so the next train is one command plus review. Record what went wrong — a missed feature, a late fix, a changelog gap — and update the process doc with the fix.",
        "concepts": ["Release automation", "Retrospectives", "Process improvement"],
        "hints": ["Automate the boring parts; keep the judgement calls human.", "The retro is where the process actually improves.", "The script should be safe to run twice."],
        "acceptanceCriteria": ["The full tag and branch history is explainable", "The cut-release script works end to end", "The process doc records at least one improvement", "Any team member can cut the next release"],
        "tests": ["Run the cut-release script for a dry-run release", "Trace every tag to its commit", "Have a second person cut a release using only the docs"]
      }
    ],
    "reviewChecklist": [
      "Releases are cut on schedule from a frozen branch",
      "Every release has an annotated tag and a changelog",
      "Hotfixes ship as patch versions from the tag",
      "Fixes are merged back to main",
      "Versions increase monotonically and are traceable"
    ],
    "finalAssessment": [
      "Show the release history from v1.1.0 to v1.2.1",
      "Explain why a feature missed the train and where it went",
      "Trace a release tag to its exact commit",
      "Walk through the hotfix flow step by step",
      "Cut a new release using only the docs and script"
    ]
  },
  {
    "id": "proj-git-monorepo-migration",
    "slug": "git-monorepo-migration",
    "level": 4,
    "title": "Monorepo Migration",
    "description": "Migrate three separate repositories — a web app, an API and a shared library — into a single monorepo without losing any history: every commit from every repo must still be findable, with its original author and date. The monorepo gets a clear directory layout, a branching and CI strategy that keeps teams independent, and a migration runbook the team can follow for the next repo. Done means all three codebases live under one roof, `git log` shows the full history of each, CI runs only the affected projects, and no team is blocked by another team's work.",
    "skills": ["Git history", "git filter-repo", "Monorepo design", "CI path filtering", "Branching strategy", "CODEOWNERS", "Migration planning", "Team coordination"],
    "language": "git",
    "functionalRequirements": [
      "Migrate three repos into one monorepo preserving full commit history",
      "Place each repo under its own directory (apps/web, services/api, libs/shared)",
      "Keep original authors, dates and messages on every migrated commit",
      "Resolve the overlapping files and conflicting histories during the merge",
      "Set up CODEOWNERS so each team owns its directories",
      "Configure CI to run only the projects affected by a change",
      "Define a branching strategy that lets teams work independently",
      "Provide a rollback plan and a migration runbook for the next repo"
    ],
    "nonFunctionalRequirements": [
      "No commit history is lost or rewritten beyond the directory move",
      "The monorepo history is explainable: each commit traces to its source repo",
      "CI for an untouched project does not run",
      "Teams can merge without waiting on other teams' reviews",
      "The migration is rehearsed on copies before touching the real repos"
    ],
    "architecture": "Each source repo is rewritten with git filter-repo to move its files under its monorepo path, then merged into the monorepo with git merge --allow-unrelated-histories, one repo at a time, resolving conflicts as they appear. The layout is apps/web, services/api and libs/shared with a shared tooling directory. CODEOWNERS maps directories to teams, CI uses path filters to run only affected jobs, and trunk-based development with short-lived branches keeps teams independent. The old repos are archived read-only after a freeze window.",
    "databaseSchema": "",
    "apis": [
      "CLI: git filter-repo --to-subdirectory-filter, git remote add, git merge --allow-unrelated-histories, git log --follow",
      "GitHub: CODEOWNERS, path-filtered CI workflows, branch protection per path",
      "Docs: docs/monorepo.md with layout, branching and CI rules"
    ],
    "fileStructure": "monorepo/\n  apps/\n    web/\n  services/\n    api/\n  libs/\n    shared/\n  tools/\n  .github/\n    workflows/\n      ci-web.yml\n      ci-api.yml\n      ci-shared.yml\n  CODEOWNERS\n  docs/\n    monorepo.md\n    migration-runbook.md",
    "taskBreakdown": [
      "Audit the three repos and plan the layout",
      "Rehearse the migration on copies",
      "Rewrite each repo into its subdirectory with filter-repo",
      "Merge the repos one at a time, resolving conflicts",
      "Verify history preservation for each repo",
      "Set up CODEOWNERS and path-filtered CI",
      "Define the branching strategy and freeze the old repos",
      "Write the runbook and migrate a fourth repo as proof"
    ],
    "milestones": [
      {
        "id": "proj-git-monorepo-migration-m1",
        "order": 1,
        "title": "Audit, layout and rehearsal",
        "objectives": ["Audit the three repos", "Design the monorepo layout", "Rehearse the full migration on copies"],
        "instructions": "Audit each repo: commit count, contributors, overlapping filenames, CI setup and secrets. Design the layout (apps/web, services/api, libs/shared) and record it in docs/monorepo.md. Then rehearse the entire migration on copies of the repos in a scratch directory, including the filter-repo rewrites and the merges, and time the process so the real migration window is realistic.",
        "concepts": ["Migration planning", "Repository audit", "Rehearsal"],
        "hints": ["Rehearse on copies; the real repos are frozen during migration.", "Overlapping files are the main risk — find them in the audit.", "Time the rehearsal to size the maintenance window."],
        "acceptanceCriteria": ["The audit lists all three repos' stats and overlaps", "The layout is documented and agreed", "A full rehearsal succeeds on copies", "The migration window is estimated from the rehearsal"],
        "tests": ["List overlapping paths across the three repos", "Complete a rehearsal migration end to end", "Verify the rehearsed history counts match the sources"]
      },
      {
        "id": "proj-git-monorepo-migration-m2",
        "order": 2,
        "title": "Rewrite history and merge the repos",
        "objectives": ["Rewrite each repo into its subdirectory", "Merge with unrelated histories", "Resolve conflicts and verify history"],
        "instructions": "For each repo, clone a fresh copy and run git filter-repo --to-subdirectory-filter apps/web (or its path) to move every file, then add it as a remote of the monorepo and merge with --allow-unrelated-histories. Resolve any conflicts — usually duplicate config files or READMEs — by keeping the monorepo version and noting the decision. After each merge, verify with git log --follow that the original commits, authors and dates are intact.",
        "concepts": ["filter-repo", "Unrelated histories", "History preservation"],
        "hints": ["Never run filter-repo on the original repo — always a fresh clone.", "Merge one repo at a time so conflicts stay small.", "Check authors and dates, not just file contents."],
        "acceptanceCriteria": ["All three codebases are under their monorepo paths", "Commit counts match the source repos", "Original authors and dates are preserved", "Conflicts are resolved and documented"],
        "tests": ["Count commits per path and compare with the sources", "Check author and date on a migrated commit", "List the resolved conflicts and their decisions"]
      },
      {
        "id": "proj-git-monorepo-migration-m3",
        "order": 3,
        "title": "CODEOWNERS, path-filtered CI and branching",
        "objectives": ["Assign ownership per directory", "Run CI only for affected projects", "Define the branching strategy"],
        "instructions": "Write CODEOWNERS mapping apps/web, services/api and libs/shared to their teams, and set branch protection so each team's approval is required only for its paths. Split CI into per-project workflows triggered by path filters, so a change to apps/web runs only the web jobs. Document trunk-based development with short-lived branches in docs/monorepo.md, including the rule that a shared-library change needs its consumers' CI to pass.",
        "concepts": ["CODEOWNERS", "Path-filtered CI", "Trunk-based development"],
        "hints": ["Ownership should match who can actually review the code.", "Path filters are what keep CI fast in a monorepo.", "A libs change that breaks a consumer must fail before merging."],
        "acceptanceCriteria": ["Each directory has an owner team", "A web-only change runs only web CI", "A libs change runs libs and consumer CI", "The branching strategy is documented"],
        "tests": ["Open a web-only PR and list the CI jobs that ran", "Open a libs PR and check consumer jobs ran", "Verify the wrong team's approval does not satisfy protection"]
      },
      {
        "id": "proj-git-monorepo-migration-m4",
        "order": 4,
        "title": "Freeze, archive and the runbook",
        "objectives": ["Freeze and archive the old repos", "Verify the monorepo end to end", "Write the runbook and migrate a fourth repo"],
        "instructions": "Announce the freeze, archive the three old repos as read-only with a pointer to the monorepo, and verify the monorepo builds and passes all three CI suites from a clean clone. Write docs/migration-runbook.md covering the audit, rehearsal, filter-repo commands, merge order, conflict log and rollback plan (restore from the archived repos). Prove the runbook by migrating a small fourth repo into the monorepo following only the runbook.",
        "concepts": ["Repository archival", "Rollback planning", "Runbooks"],
        "hints": ["Archive, do not delete — the old repos are the rollback.", "The runbook is proven by someone else following it.", "A clean-clone build is the real verification."],
        "acceptanceCriteria": ["Old repos are archived read-only with pointers", "A clean clone builds and passes all CI", "The runbook covers every migration step and rollback", "A fourth repo is migrated using only the runbook"],
        "tests": ["Clone the monorepo fresh and run all CI suites", "Confirm the old repos reject pushes", "Follow the runbook to migrate a fourth repo"]
      }
    ],
    "reviewChecklist": [
      "Full history is preserved with authors and dates",
      "Each codebase sits under its own directory",
      "CI runs only affected projects",
      "Teams own their paths and merge independently",
      "The runbook lets anyone migrate the next repo"
    ],
    "finalAssessment": [
      "Show the history of a file traced back to its original repo",
      "Open PRs in two projects and show independent CI",
      "Explain a resolved conflict and why it was resolved that way",
      "Migrate a fourth repo using only the runbook",
      "Explain the rollback plan if the migration had failed"
    ]
  },
];
